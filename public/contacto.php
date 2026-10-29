<?php
/**
 * Formulario de cotización de tslmexico.com.
 * Corre en el cPanel de hosting-mexico.net (PHP). En GitHub Pages no funciona: ahí el formulario
 * ofrece enviar por WhatsApp como alternativa.
 *
 * Configuración: correo que recibe las cotizaciones y remitente del dominio (debe existir en cPanel
 * para que el correo no caiga en spam).
 */
$TO = 'ventas@tslmexico.com';
$FROM = 'no-reply@tslmexico.com';

header('Content-Type: application/json; charset=utf-8');

function reply($ok, $code = 200)
{
    http_response_code($code);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(false, 405);
}

// Bots: campo trampa lleno o formulario enviado en menos de 3 segundos
if (!empty($_POST['website']) || (int) ($_POST['t'] ?? 0) < 3) {
    reply(true);
}

function field($key, $max = 300)
{
    $value = trim(strip_tags((string) ($_POST[$key] ?? '')));
    return mb_substr($value, 0, $max);
}

// Evita inyección de encabezados en los valores que van al correo
function single_line($value)
{
    return str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
}

$data = [
    'Nombre' => single_line(field('nombre', 120)),
    'Empresa' => single_line(field('empresa', 120)),
    'Teléfono' => single_line(field('telefono', 40)),
    'Correo' => single_line(field('correo', 160)),
    'Origen' => single_line(field('origen', 160)),
    'Destino' => single_line(field('destino', 160)),
    'Tipo de carga' => single_line(field('carga', 80)),
    'Tipo de unidad' => single_line(field('unidad', 80)),
    'Fecha estimada' => single_line(field('fecha', 20)),
    'Detalles' => field('mensaje', 2000),
];

foreach (['Nombre', 'Teléfono', 'Correo', 'Origen', 'Destino'] as $key) {
    if ($data[$key] === '') {
        reply(false, 422);
    }
}
if (!filter_var($data['Correo'], FILTER_VALIDATE_EMAIL)) {
    reply(false, 422);
}

$subject = 'Cotización web: ' . $data['Origen'] . ' → ' . $data['Destino'];
$body = "Nueva solicitud de cotización desde tslmexico.com\n\n";
foreach ($data as $label => $value) {
    if ($value !== '') {
        $body .= $label . ': ' . $value . "\n";
    }
}
$body .= "\nEnviado: " . date('d/m/Y H:i') . "\n";

$headers = [
    'From: TSL México <' . $FROM . '>',
    'Reply-To: ' . $data['Nombre'] . ' <' . $data['Correo'] . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . $FROM);
reply($sent, $sent ? 200 : 500);
