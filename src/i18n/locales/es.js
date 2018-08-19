/* eslint-disable */

export default {
  app_name: 'APP DE CONDUCTOR',
  company_name: 'Yojee',
  alert_error_title: 'Yojee',

  // begin driver app rewrite
  job_type: 'Tipo de trabajo',
  finish_task: 'TERMINAR',
  report_task: 'INFORME',
  job_incoming: 'TAREA ENTRANTE',
  job: {
    delivery_same_day: 'Mismo día',
    delivery_sameday: 'Mismo día', // for old backend task service_type
    delivery_next_day: 'Día siguiente'
  },
  prev: 'ANTERIOR',
  next: 'SIGUIENTE',
  dimension: 'Dimensión',
  weight: 'Peso',
  today: 'Hoy',
  // end driver app rewrite

  task_time_requirement: '%s debe hacerse de %s a %s',

  // button
  btn_try_again: 'INTENTAR OTRA VEZ',
  accept: 'Aceptar',
  reject: 'Rechazar',
  curjob_button_later: 'Después',
  alert_button_ok: 'OK',
  btn_logout: 'Salir',
  btn_done: 'Hecho',
  cancel: 'Cancelar',
  btn_change_phone_number: 'Cambiar número de teléfono',
  btn_collected: 'Recogido',
  btn_delivered: 'Entregado',

  // Splash activity
  splash_pilot_name: 'Piloto',
  splash_button_start: 'Iniciar',

  // Authorization activity
  auth_screen_sign_in: 'Iniciar sesión',
  auth_screen_title: 'Inicio sesión',
  auth_screen_phone_placeholder: 'Número de teléfono',
  auth_screen_code_placeholder: 'Tu código',
  auth_screen_instruction1:
    'Confirma el código de país e introduce tu número de teléfono.',
  auth_screen_instruction2:
    'Se ha enviado un código de activación a tu teléfono. Introdúcelo arriba.',
  auth_screen_terms:
    'Al iniciar  sesión, aceptas los Términos del Servicio <a href="https://sendyojee.com/terms">Yojee</a> y la Política de Privacidad <a href="https://sendyojee.com/privacy"></a>.',
  auth_screen_request_new_code: '<u>Solicitar otro código</u>.',
  auth_screen_not_code_received: '¿No has recibido el código?',
  country_code_title: 'Seleccionar país.',

  // Settings fragment
  settingsfrgmt_title: 'Configuración',
  settingsfrgmt_status: 'Estado',
  settingsfrgmt_button_status_delivery: 'ENTREGA',
  settingsfrgmt_button_change_avatar: 'Cambiar avatar',
  settingsfrgmt_button_logout: 'Salir',
  settings_fragment_dialog_change_status_title: 'Cambiar estado',
  // Chats fragment
  chats_fragment_title: 'Chats',
  chats_fragment_search_hint: 'Buscar chat',
  // Chat Thread fragment
  chats_thread_fragment_button_send: 'Enviar',
  chats_thread_fragment_new_message_hint: 'Nuevo mensaje',
  // Drivers fragment
  drivers_fragment_title: 'Conductores',
  drivers_fragment_search_hint: 'Buscar grupo',
  drivers_fragment_live_thread_group_title: 'Grupos',
  drivers_fragment_live_thread_driver_title: 'Conductores',

  // Map fragment
  map_marker_me_title: 'Yo',

  record_dismiss: 'Tocar para descartar',
  // Sync Data
  get_your_info: 'Obtén tu información',
  get_group: 'Obtén los grupos a los que te has unido',
  get_member: 'Obtén contactos de empresa',
  get_chat_server: 'Obtén la configuración del sistema',
  get_conversation: 'Obtén la última conversación',

  // Help screen
  help_accident: 'Accidente',
  help_call_ambulance: 'LLamar a ambulancia',
  help_call_police: 'LLamar a policía',
  help_delay: 'Retraso',
  help_courier_replacement: 'Sustitución de transportista',
  help_other: 'Otro',

  // Current job
  job_time: 'minutos',
  job_preview_est_time: 'Tiempo estimado: %.1f minutos',
  job_preview_est_prc: 'Precio estimado: %.1f SGD',
  job_preview_available: 'Entrega disponible',
  job_preview_see_more: 'Ver %d pasos más',

  curjob_step: 'Paso %s',
  curjob_proceed_pickup_normal: 'Proceder a %s y recoger paquete.',
  curjob_proceed_pickup: 'Proceder a <b>%s</b> y recoger paquete',
  curjob_proceed_pickup_default: 'Proceder a la recogida del paquete.',
  curjob_proceed_delivery_normal: 'Entregar paquete a %s.',
  curjob_proceed_delivery: 'Entregar paquete a <b>%s</b>.',
  curjob_proceed_delivery_default: 'Proceder a la entrega del paquete.',
  curjob_not_found: 'No hay tareas disponibles.',
  curjob_not_found_subtitle:
    'No pasa nada. Arrastra hacia abajo la pantalla para actualizar',
  reject_reason_too_far: 'Demasiado lejos',
  reject_reason_too_cheap: 'Demasiado barato',
  reject_reason_other: 'Otro',
  dialog_time_info_title: 'Distance de\nentrega',
  dialog_time_info_content:
    'La distancia entre el punto de recogida  y el punto de entrega es de <b>%d minutos<b/>',
  dialog_price_info_title: 'Tarifa de\nentrega',
  dialog_price_info_content: 'Después de hacer la entrega recibirás <b>%s</b>.',

  // message
  message_voice_present: '[Mensaje de voz]',
  // error
  error_phone_invalid: 'Número de teléfono no válido.',
  error_invalid_input:
    'Debes proporcionar un numero de teléfono o un correo electrónico válidos. ',
  error_unknown: 'Error desconocido.',
  error_request_fail: 'Solicitud de error de servidor.',
  image_capture_fail: 'No se ha podido capturar la imagen: %s',

  // loading
  loading_connect: 'Conectando...',
  loading: 'Cargando...',
  loading_reject_job: 'Rechazar tarea...',
  loading_accept_job: 'Aceptar tarea...',
  loading_start_job: 'Iniciar tarea...',
  loading_complete_step: 'Completar un paso...',
  loading_detect_location: 'Detectando ubicación...',
  loading_cancel_job: 'Cancelar tarea...',

  // selection
  select_from_gallery: 'De la Galería',
  select_from_camera: 'Con la cámara',

  // confirmation
  ask_for_logout: '¿Seguro que quieres abandonar la sesión?',

  // tab
  tab_home: 'Inicio',
  tab_chat: 'Chat',
  tab_job: 'Tarea',
  tab_help: 'Ayuda',
  tab_profile: 'Perfil',

  tab_jobs: 'TAREAS',

  chat_last_seen_online: 'En línea',
  chat_last_seen_offline: 'Fuera de línea',
  chat_last_seen_min: 'Última vista hace %d minutos',
  chat_last_seen_hour: 'Última vista hace %d horas',
  chat_last_seen_day: 'Última vista en %s',

  job_today: 'Hoy',
  job_yesterday: 'Ayer',

  vehicle_type: 'Tipo de vehículo',
  delivery_type: 'Tipo de entrega',
  delivery_type_walking: 'Soy un peatón',
  delivery_type_cycling: 'Soy un ciclista',
  delivery_type_motor: 'Soy un motorista',
  delivery_type_car: 'Soy un conductor de coche',

  permission_denied_to_location_service:
    'Permiso de acceso a ubicación general/detallada denegado ',
  off_duty: 'Fuera de servicio',
  on_duty: 'En servicio',
  not_available: 'No disponible',
  in_delivery: 'En curso de entrega',
  idle: 'Inactivo',

  job_status_new: 'Nueva tarea',
  job_status_accepted: 'Aceptado',
  job_status_rejected: 'Rechazado',
  job_status_abort: 'Abortado',
  job_status_enroute: 'En ruta',
  job_status_complete: 'Completado',
  job_status_started: 'Iniciado',
  job_status_unknown: 'Desconocido',
  no_job_available: 'No hay tareas disponibles\nen este momento.',
  available_jobs: 'Tareas disponibles: %d',
  job_progress: '%d / %d Tareas',
  no_job_available_reload: 'Recargar',
  job_status_ongoing: 'En curso',
  job_status_assigned: 'Asignado',
  job_start_label: 'Iniciar',
  jobs_no_job_available:
    'Ve a la página Rutas para gestionar las tareas actuales.',
  fetching_jobs_failed: 'Se ha producido un error al recuperar tareas',

  // direction titles
  duration_subtitle: 'minutos',
  search: 'Buscar',

  // marker
  pick_up_point: 'Recoger',
  delivery_on: 'Punto de entrega',

  // alert change off duty
  alert_in_delivery:
    'Debes completar o abandonar tu tarea actual para cambiar a "Fuera de servicio".',

  job_preview_show_less: 'Mostrar menos',
  expected_delivery_time: 'Plazo de entrega estimado',
  error_not_accept_change_job_status:
    'Primero tienes que completar la tarea actual.',
  splash_app_name: 'Sistema de conductor',

  hello_blank_fragment: 'Hola fragmento en blanco',
  selected_job_corrupted: 'Tarea seleccionada dañada',
  selected_job_has_corrupted_data_please_call_support_line:
    'La tarea seleccionada tiene datos dañados. Llama al teléfono de asistencia. ',
  close: 'Cerrar',
  leg_address: 'Dirección',
  leg_contact: 'Contacto',
  delivery: 'Entrega',
  see_detail: 'Mostrar detalles',
  curjob_step_from: '<b>De:</b> %s',
  curjob_step_to: '<b>A:</b> %s',
  curjob_number_of_legs: '<b>Número de patas:</b> %02d',
  pickup: 'Recogida',
  dropoff: 'Entrega',
  home_list: 'LISTA',
  home_map: 'MAPA',
  home_status: 'ESTADO',
  job_rejected_title: 'Tarea rechazada',

  // JOB MESSAGE
  job_message_created: '%s crean la tarea.',
  job_message_update_description: '%s actualizan descripción de la tarea.',
  job_message_assigned: '%1$s asignados %2$s a la tarea.',
  job_message_accepted_joined:
    '%s han aceptado la tarea y se han unido al chat.',
  job_message_added_leg: '%1$s pata añadida %2$d a la tarea.',
  job_message_rejected: '%s han rechazado la tarea.',
  job_message_started: '%s han iniciado la tarea.',
  job_message_completed: '%s han completado la tarea.',
  job_message_completed_leg: '%1$s pata completada %2$d de la tarea.',
  job_message_quited: '%s han abandonado la tarea.',
  job_message_started_leg: '%1$s pata iniciada %2$d de la tarea.',
  job_message_deleted_leg: '%1$s pata eliminada %2$d de la tarea.',
  job_message_updated_desc_leg: '%1$s descripción actualizada de pata %2$d.',
  job_message_changed_address_leg: '%1$s dirección modificada de pata %2$d.',
  job_message_unassigned: '%1$s desasignado %2$s de la tarea.',
  job_message_left_chat: '%s han abandonado el chat.',
  job_message_someone_left_chat: 'Alguien ha abandonado el chat.',
  tab_history: 'Historial',
  duration_hours: 'horas',
  new_assigned: 'Nuevo',
  proof_of_delivery: 'Justificante de entrega',
  signature_clear: 'Borrar',
  signature_submit: 'Enviar',
  actual_recipient: 'Destinatario actual',
  signature_here: '%s\nfirmar aquí',
  error_no_sign: 'Firmar en primer lugar.',
  signature_here_no_name: 'firmar aquí.',
  tab_route: 'Ruta',
  capture_photo_proof: 'Tomar una foto como justificante',
  capture_photo: 'Foto',
  retake_photo: 'Cancelar',
  photo_proof_submit: 'Enviar',

  type_here: 'Escribir aquí...',
  i_agree: 'De acuerdo',
  disagree: 'En desacuerdo',
  error_invalid_code: 'Introducir un código válido',
  request_failed: 'Error de solicitud con %s.',
  final_agreed_price: 'Precio final acordado %s',

  no_job_in_history:
    'No hay tareas en el historial. Acepta y finaliza una tarea.',
  no_chat_available: 'No hay conversaciones. Intenta actualizar.',

  enable_location_service: 'Habilitar la información de ubicación',
  please_enable_location_service:
    'Algo no funciona, no es posible obtener tu ubicación. Comprueba los permisos de la aplicación y habilita el GPS.',

  history_range_today: 'Hoy',
  history_range_1_week: 'Últimos 7 días',
  history_range_1_month: 'Últimas 4 semanas',
  history_range_range: 'Rango',
  history_number_of_jobs_completed: 'Nº de tareas completadas: %d',
  history_range_filter_from: 'De',
  history_range_filter_to: 'A',

  code_scanner_scan_the_code: 'Escanear el código',
  code_scanner_submit: 'Enviar',
  code_scanner_reset: 'Reiniciar',
  code_scanner_code_read: 'Lectura de código',

  upload_picture_title: 'Tomar una foto',
  notice: 'Aviso',
  can_we_asccess_your_camera_and_storage:
    '¿Podemos acceder a tu cámara y tu almacenamiento?',
  we_need_access_your_camera_and_storage:
    'Necesitamos acceder para que puedas tomar la foto y guardarla.',

  version_out_date:
    'Tu actual versión no está actualizada. ¡Actualízala para poder continuar!',
  open_settings: 'Abrir configuración',
  language: 'Idioma',
  select_language: 'Seleccionar idioma',
  delivery_unsuccessful: 'Entrega fallida',
  delivery_choose_reason: 'Selecciona uno o más motivos',
  reason_description: 'toca para introducir tu motivo...',
  other_reason: 'Otros motivos',
  offline_mode_on: 'Estás en modo fuera de línea',
  retry_sync: 'Sincronizar',
  offline_message: 'Lo sentimos, este modo no está disponible fuera de línea.',
  sync_offline: 'Sincronizando datos...',
  sync_error_notice:
    'Tienes algunas tareas nuevas sin sincronizar. ¿Quieres sincronizarlas ahora?',
  cod_pod:
    'Se ha hecho un pago en efectivo a %s y se ha recogido cambio, si se ha producido.',
  enter_your_reason: 'Introduce tu motivo',
  syncing_failed_message:
    'Por alguna razón no se ha sincronizado todavía la tarea. Intenta completar la tarea otra vez. \n\n %s',

  enable_dex_cod_enabled:
    'Nota: para habilitar el botón de excepción de entrega, desmarca la casilla de contrarrembolso COD y borra la firma.',
  enable_dex_cod_disabled:
    'Nota: borra la firma para habilitar el botón de excepción de entrega.',

  login_with_touch_id: 'INICIO DE SESIÓN CON TOUCH ID',
  register_here:
    'Regístrate <b>aquí</b> si todavía no eres un usuario registrado',
  fingerprint_does_not_mach: 'No hay coincidencia, ¡inténtalo otra vez!',
  fingerprint_authentication_failed:
    'Error de autenticación, ¡espera antes de reintentarlo!',
  fingerprint_ios_message:
    'Escanea tu huella dactilar en el escáner del dispositivo para continuar',
  dropoff_location: 'Ubicación de entrega',
  pickup_location: 'Ubicación de recogida',
  enter_phone: 'Número de teléfono, p. ej.  +6599256677',
  stats: 'estadísticas',
  incorrect_otp_code: 'Código OTP incorrecto',
  completed_jobs: 'TAREAS COMPLETADAS',
  income: 'INGRESO',
  loadingStatError: 'Error al cargar las estadísticas',
  job_type: 'Tipo de trabajo',

  history_no_item: 'No has completado todavía ninguna tarea',
  select_vehicle: 'Seleccionar vehículo',
  select: 'Seleccionar',
  force_vehicle_selection: '¡Debes seleccionar tu vehículo antes de empezar!',
  no_vehicle: 'No hay ningún vehículo seleccionado',
  detail: 'Detalle',
  tasks: 'Tareas',
  // too far dialog
  done_too_far: 'Estás demasiado lejos',
  done_too_far_description:
    '\n No pareces estar suficientemente cerca de la ubicación. \n ¿Seguro que quieres fijar este paso como<b>"Hecho"</b>?',
  yes: 'Sí',
  cancel: 'Cancelar',
  complete_task: '¿Completar tarea?',
  complete_task_description: '\n Vas a completar una tarea. \n ¿Seguro?',

  task: 'Tarea',
  task_detail: 'Detalle de tarea',

  delivery_exception_dialog_title: 'ENTREGA FALLIDA',
  describe: 'Describir',
  photo: 'Foto',
  signature: 'Firma',
  pickup_location: 'Ubicación de recogida',
  dropoff_location: 'Ubicación de entrega',
  accepted: 'Aceptado',
  completed: 'Completado',
  reported: 'Informado',
  more: 'Más',
  fetching_direction: 'Dirección de recuperación',
  kilometers: 'kilómetros',
  ignore: 'Ignorar',
  select_avatar: 'Seleccionar avatar',
  week_a: 'S',
  syncing_failed_title: 'Sincronizar la tarea %s con el servidor fallido',
  permission_missing: 'Permisos faltantes',
  permission_missing_description:
    'Se ha perdido el permiso, vaya a configuración y habilite permisos para asegurarse de que la aplicación funcione correctamente.',
  scanner: 'Escáner',
  scanner_guide: 'Escanea el código QR uno por uno',
  bulk_complete_title: 'Error al completar múltiples tareas',
  bulk_complete_des: 'Error del servidor% s',
  item_exist: 'Item% s ya está en la lista',
  scanned_items: 'Elementos escaneados',
  no_items: 'No items',
  bulk_working: 'Trabajando, por favor espere ...',
  bulk_working_done: 'Processing success!',
  estimated_time: 'Tiempo estimado',
  operation_not_allow: '¡Operación no permitida!',
  api_errors: {
    backend_error: 'Oops! there was an unexpected error in our system. Please try again later or contact us.',
    AC0001: 'No existe una cuenta con ese número de teléfono',
    AC0002: 'Código OTP caducado o no válido',
    AC0003: 'El token no se encontró.',
    AC0004: '¡Restablecer token de contraseña no existe!',
    AC0005: 'Ha caducado el token de contraseña de restablecimiento, ¡inténtelo de nuevo!',
    // Artículos (AR): 0101 - 0200
    // AuditTrail (AT): 0201 - 0300
    // Asignación (AL): 0301 - 0400
    AL0301: 'Estrategia de asignación inválida',
    AL0302: 'No se pudo asignar taskgroup.',
    // Reservas (BK): 0501 - 0600
    BK0501: 'Los elementos matriz está vacía.',
    BK0502: 'Steps array is empty.',
    BK0503: 'La matriz de elementos_están está vacía.',
    BK0504: 'No se puede cancelar una orden con las tareas iniciadas.',
    BK0505: 'No se pudo crear el lote.',
    BK0506: 'Número de teléfono inválido ingresado',
    BK0507: 'No es un número válido.',
    BK0508: 'Fecha / hora ingresada incorrectamente. Utilice el formato 30/12/2018 18:00. ',
    BK0509: 'País invalido',
    BK0510: 'Orden no encontrada.',
    BK0511: "No se puede editar el artículo de pedido con las tareas iniciadas",
    BK0512: 'No se puede editar una orden cancelada',
    BK0513: 'Fecha en el pasado',
    BK0514: 'Falta el país',
    BK0515: 'Las abreviaturas no se pueden utilizar. Ingrese el nombre completo ',
    BK0516: 'La celda no se puede dejar en blanco',
    BK0517: "El tiempo de entrega no puede antes del tiempo de recolección",
    BK0518: 'Tipo de servicio no encontrado',
    // Companies (CO): 0601 - 0700,
    CO0601: 'Tipo de archivo inválido',
    CO0602: 'Id. De grupo de tareas no válidas en la consulta',
    // Red (NW): 0701 - 0800
    NW0701: 'Hay centros asociados con esta región.',
    NW0702: 'Hay radios asociados con este concentrador',
    // ServiceType (ST): 0801 - 0900
    // Configuraciones (SE): 0901 - 1000     
    SE0901: 'El motivo de la excepción de la tarea no existe',
    // Trabajo (WO): 1001 - 1100  
    WO1001: 'El trabajador ya está aprobado',
    WO1002: 'Ya hay un trabajador asignado a este grupo de tareas',
    WO1003: 'El trabajador está fuera de servicio',
    WO1004: 'Error al aceptar tareas',
    WO1005: 'Error al asignar tareas',
    WO1006: 'Error al desasignar tareas',
    WO1007: "¡El trabajador ha iniciado una tarea, no se puede desasignar el grupo de tareas!",
    WO1008: 'Zona horaria no válida',
    WO1009: 'Debe completar o informar las tareas en curso, para poder cambiar a servicio fuera de servicio.',
    WO1010: 'Usted no es dueño de este vehículo.',
    WO1011: 'Regla de Sub Tarea no existe.',
    WO1012: 'Una o más tareas anteriores no se han completado',
    WO1013: 'No se puede mover el estado de invalidado a asignado',
    WO1014: 'Tarea ya completada o artículo no destinado para el trabajador',
    WO1015: 'Una o más tareas secundarias no se han completado',
    WO1016: 'El trabajador tiene una tarea asignada. Desasigne la tarea o espere a que el controlador complete la tarea antes de continuar ',
    // Pagos (PM): 1101 - 1200
    PM1101: 'Detalles de tarjeta no válidos',
    PM1102: 'El método de pago no es aceptado',
    // Precios (PX): 1201 - 1300
    PX1201: 'No se puede calcular el precio',
    PX1202: 'Error al obtener las cotizaciones de precios',
    PX1203: 'Formato de precio inválido, el precio debe ser un número',
    PX1204: 'Moneda inválida, la moneda debe seguir ISO 4217',
    // Mapas (MA): 1301 - 1400
    MA1301: 'No se puede calcular la distancia',
    MA1302: 'No se pudo geocodificar la dirección',
    MA1303: 'No se encontraron direcciones para este texto ingresado',
    MA1304: 'No se han podido obtener indicaciones, no se ha encontrado ninguna ruta',
    MA1305: 'Coordenadas geográficas inválidas',
    // Notificación (NF): 1401 - 1500
    // Planner (PL): 1501 - 1600
    // Búsqueda (ES): 1601 - 1700
    ES1601: 'No se puede llegar al servidor de búsqueda',

    // Documentos (DO): 1701 - 1800
    DO1701: 'Contiene orden ya facturada',
    DO1702: 'contiene precio de orden inválido',
    // Partners (PT): 1801 - 1900
    PT1801: 'CIP no válido',
    PT1802: 'No es una solicitud válida'
  }
}