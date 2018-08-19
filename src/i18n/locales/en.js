/* eslint-disable */

export default {
  app_name: 'DRIVER APP',
  company_name: 'Yojee',
  alert_error_title: 'Yojee',

  // begin driver app rewrite
  job_type: 'Task type',
  finish_task: 'FINISH',
  report_task: 'REPORT',
  job_incoming: 'INCOMING TASK',
  job: {
    delivery_same_day: 'Same Day',
    delivery_sameday: 'Same Day', // for old backend task service_type
    delivery_next_day: 'Next Day'
  },
  prev: 'PREV',
  next: 'NEXT',
  dimension: 'Dimension',
  weight: 'Weight',
  today: 'Today',
  // end driver app rewrite

  task_time_requirement: '%s has to be done between %s to %s',

  // button
  btn_try_again: 'TRY AGAIN',
  accept: 'Accept',
  reject: 'Reject',
  curjob_button_later: 'Later',
  alert_button_ok: 'Ok',
  btn_logout: 'Log Out',
  btn_done: 'Done',
  cancel: 'Cancel',
  btn_change_phone_number: 'Change phone number',
  btn_collected: 'Collected',
  btn_delivered: 'Delivered',

  // Splash activity
  splash_pilot_name: 'Pilot',
  splash_button_start: 'Start',

  // Authorization activity
  auth_screen_sign_in: 'Sign In',
  auth_screen_title: 'Login',
  auth_screen_phone_placeholder: 'Phone Number',
  auth_screen_code_placeholder: 'Your code',
  auth_screen_instruction1:
    'Please confirm country code and enter your phone number.',
  auth_screen_instruction2:
    'An activation code has been sent to your phone. Please enter it above.',
  auth_screen_terms:
    'By signing in, you agree to Yojee\'s <a href="https://sendyojee.com/terms">Terms of Service</a> and <a href="https://sendyojee.com/privacy">Privacy Policy</a>.',
  auth_screen_request_new_code: '<u>Request a new one</u>.',
  auth_screen_not_code_received: 'No code received?',
  country_code_title: 'Select country',

  // Settings fragment
  settingsfrgmt_title: 'Settings',
  settingsfrgmt_status: 'Status',
  settingsfrgmt_button_status_delivery: 'DELIVERY',
  settingsfrgmt_button_change_avatar: 'Change Avatar',
  settingsfrgmt_button_logout: 'Logout',
  settings_fragment_dialog_change_status_title: 'Change status',
  // Chats fragment
  chats_fragment_title: 'Chats',
  chats_fragment_search_hint: 'Search chat',
  // Chat Thread fragment
  chats_thread_fragment_button_send: 'Send',
  chats_thread_fragment_new_message_hint: 'New Message',
  // Drivers fragment
  drivers_fragment_title: 'Drivers',
  drivers_fragment_search_hint: 'Search group',
  drivers_fragment_live_thread_group_title: 'Groups',
  drivers_fragment_live_thread_driver_title: 'Drivers',

  // Map fragment
  map_marker_me_title: 'Me',

  record_dismiss: 'Tap to dismiss',
  // Sync Data
  get_your_info: 'Get your info',
  get_group: 'Get groups you have joined',
  get_member: "Get company's contacts",
  get_chat_server: 'Get system configuration',
  get_conversation: 'Get latest conversation',

  // Help screen
  help_accident: 'Accident',
  help_call_ambulance: 'Call Ambulance',
  help_call_police: 'Call Police',
  help_delay: 'Delay',
  help_courier_replacement: 'Courier Replacement',
  help_other: 'Other',

  // Current job
  job_time: 'min(s)',
  job_preview_est_time: 'Estimated Time: %.1f min(s)',
  job_preview_est_prc: 'Estimated Price: %.1f SGD',
  job_preview_available: 'Available Delivery',
  job_preview_see_more: 'See %d more step',

  curjob_step: 'Step %s',
  curjob_proceed_pickup_normal: 'Proceed to %s and collect parcel.',
  curjob_proceed_pickup: 'Proceed to <b>%s</b> and collect parcel',
  curjob_proceed_pickup_default: 'Proceed to collect parcel.',
  curjob_proceed_delivery_normal: 'Deliver parcel to %s.',
  curjob_proceed_delivery: 'Deliver parcel to <b>%s</b>.',
  curjob_proceed_delivery_default: 'Proceed to deliver parcel.',
  curjob_not_found: 'No tasks available.',
  curjob_not_found_subtitle: "Don't panic. Just pull down the page to refresh",
  reject_reason_too_far: 'Too Far',
  reject_reason_too_cheap: 'Too Cheap',
  reject_reason_other: 'Other',
  dialog_time_info_title: 'Distance of\ndelivery',
  dialog_time_info_content:
    'Distance between Pickup point to Delivery point is <b>%d mins<b/>',
  dialog_price_info_title: 'Fare of\ndelivery',
  dialog_price_info_content:
    "You'll earn <b>%s</b> after you deliver this parcel.",

  // message
  message_voice_present: '[Voice message]',
  // error
  error_phone_invalid: 'Phone number is invalid.',
  error_invalid_input:
    'You must provide a valid phone number or email address.',
  error_unknown: 'Unknown error.',
  error_request_fail: 'Request to server error.',
  image_capture_fail: 'Failed to capture image: %s',

  // loading
  loading_connect: 'Connecting...',
  loading: 'Loading...',
  loading_reject_job: 'Reject task...',
  loading_accept_job: 'Accept task...',
  loading_start_job: 'Start task...',
  loading_complete_step: 'Complete a step...',
  loading_detect_location: 'Detecting location...',
  loading_cancel_job: 'Cancel task...',

  // selection
  select_from_gallery: 'From Gallery',
  select_from_camera: 'With Camera',

  // confirmation
  ask_for_logout: 'Are you sure to log out?',

  // tab
  tab_home: 'Home',
  tab_chat: 'Chat',
  tab_job: 'Task',
  tab_help: 'Help',
  tab_profile: 'Profile',

  tab_jobs: 'TASKS',

  chat_last_seen_online: 'Online',
  chat_last_seen_offline: 'Offline',
  chat_last_seen_min: 'Last seen %d minute(s) ago',
  chat_last_seen_hour: 'Last seen %d hour(s) ago',
  chat_last_seen_day: 'Last seen on %s',

  job_today: 'Today',
  job_yesterday: 'Yesterday',

  vehicle_type: 'Vehicle Type',
  delivery_type: 'Delivery Type',
  delivery_type_walking: 'I am a pedestrian',
  delivery_type_cycling: 'I am a biker',
  delivery_type_motor: 'I am a motorbike rider',
  delivery_type_car: 'I am a car driver',

  permission_denied_to_location_service:
    'Permission denied to access fine/coarse location',
  off_duty: 'Off Duty',
  on_duty: 'On Duty',
  not_available: 'Not Available',
  in_delivery: 'In Delivery',
  idle: 'Idle',

  job_status_new: 'New task',
  job_status_accepted: 'Accepted',
  job_status_rejected: 'Rejected',
  job_status_abort: 'Aborted',
  job_status_enroute: 'Enroute',
  job_status_complete: 'Completed',
  job_status_started: 'Started',
  job_status_unknown: 'Unknown',
  no_job_available: 'No tasks available\nat the moment!',
  available_jobs: 'Available tasks: %d',
  job_progress: '%d / %d Tasks',
  no_job_available_reload: 'Reload',
  job_status_ongoing: 'Ongoing',
  job_status_assigned: 'Assigned',
  job_start_label: 'Start',
  jobs_no_job_available: 'Please go to Routes page to manage existing tasks',
  fetching_jobs_failed: 'An error has occured while fetching tasks',

  // direction titles
  duration_subtitle: 'mins',
  search: 'Search',

  // marker
  pick_up_point: 'Pick up',
  delivery_on: 'Delivery point',

  // alert change off duty
  alert_in_delivery:
    'You have to complete or quit your current task to change to "Off Duty".',

  job_preview_show_less: 'Show less',
  expected_delivery_time: 'Expected delivery time',
  error_not_accept_change_job_status:
    'You have to complete current task first.',
  splash_app_name: 'Driver System',

  hello_blank_fragment: 'Hello blank fragment',
  selected_job_corrupted: 'Selected Task Corrupted',
  selected_job_has_corrupted_data_please_call_support_line:
    'Selected task has corrupted data. Please call support line.',
  close: 'Close',
  leg_address: 'Address',
  leg_contact: 'Contact',
  delivery: 'Drop off',
  see_detail: 'Show details',
  curjob_step_from: '<b>From:</b> %s',
  curjob_step_to: '<b>To:</b> %s',
  curjob_number_of_legs: '<b>Number of legs:</b> %02d',
  pickup: 'Pick up',
  dropoff: 'Drop off',
  home_list: 'LIST',
  home_map: 'MAP',
  home_status: 'STATUS',
  job_rejected_title: 'Task rejected',

  // JOB MESSAGE
  job_message_created: '%s create the task.',
  job_message_update_description: '%s update description of the task.',
  job_message_assigned: '%1$s assigned %2$s to the task.',
  job_message_accepted_joined: '%s accepted task and joined to chat.',
  job_message_added_leg: '%1$s added leg %2$d to the task.',
  job_message_rejected: '%s rejected the task.',
  job_message_started: '%s started the task.',
  job_message_completed: '%s completed the task.',
  job_message_completed_leg: '%1$s completed leg %2$d of the task.',
  job_message_quited: '%s quit the task.',
  job_message_started_leg: '%1$s started leg %2$d of the task.',
  job_message_deleted_leg: '%1$s deleted leg %2$d of the task.',
  job_message_updated_desc_leg: '%1$s updated description of leg %2$d.',
  job_message_changed_address_leg: '%1$s changed address of leg %2$d.',
  job_message_unassigned: '%1$s unassigned %2$s from the task.',
  job_message_left_chat: '%s left the chat.',
  job_message_someone_left_chat: 'Someone left the chat.',
  tab_history: 'History',
  duration_hours: 'hours',
  new_assigned: 'New',
  proof_of_delivery: 'Proof Of Delivery',
  signature_clear: 'Clear',
  signature_submit: 'Submit',
  actual_recipient: 'Actual recipient',
  signature_here: '%s\nplease sign here',
  error_no_sign: 'Please sign first.',
  signature_here_no_name: 'please sign here.',
  tab_route: 'Route',
  capture_photo_proof: 'Take image for proof',
  capture_photo: 'Photo',
  retake_photo: 'Cancel',
  photo_proof_submit: 'Submit',

  type_here: 'Type here...',
  i_agree: 'I Agree',
  disagree: 'Disagree',
  error_invalid_code: 'Please enter a valid code.',
  request_failed: 'Request failed with %s.',
  final_agreed_price: 'Final agreed price %s',

  no_job_in_history: 'No task in history. Please accept and finish a task',
  no_chat_available: 'No conversations. Please try to refresh',

  enable_location_service: 'Enable location information',
  please_enable_location_service:
    "Something is wrong, can't get your location. Please check the permissions of the app and enable GPS!",

  history_range_today: 'Today',
  history_range_1_week: 'Last 7 days',
  history_range_1_month: 'Last 4 weeks',
  history_range_range: 'Range',
  history_number_of_jobs_completed: 'No of Tasks completed: %d',
  history_range_filter_from: 'From',
  history_range_filter_to: 'To',

  code_scanner_scan_the_code: 'Scan the code',
  code_scanner_submit: 'Submit',
  code_scanner_reset: 'Reset',
  code_scanner_code_read: 'Code Read',

  upload_picture_title: 'Take photo',
  notice: 'Notice',
  can_we_asccess_your_camera_and_storage:
    'Can we access your camera and storage please?',
  we_need_access_your_camera_and_storage:
    'We need access so you can take your picture and save the picture',

  version_out_date:
    'Your current version is outdated. Please update your App to continue!!',
  open_settings: 'Open settings',
  language: 'Language',
  select_language: 'Select language',
  delivery_unsuccessful: 'Delivery Unsuccessful',
  delivery_choose_reason: 'Please select one or more reasons',
  reason_description: 'tap to type your reason...',
  other_reason: 'Other reasons',
  offline_mode_on: "You're in offline mode",
  retry_sync: 'Sync',
  offline_message: 'Sorry, this feature is not avaiable in offline mode.',
  sync_offline: 'Syncing data...',
  sync_error_notice: 'You have some tasks have not been synced. Sync now?',
  cod_pod: 'Cash payment made to %s and collected changes if any.',
  enter_your_reason: 'Please enter your reason',
  syncing_failed_message:
    'For some reasons, task has not synced yet. Please try complete the task again. \n\n %s',

  enable_dex_cod_enabled:
    'Note: To enable the delivery exception button uncheck COD check and clear signature.',
  enable_dex_cod_disabled:
    'Note: To enable the delivery exception button clear signature.',

  login_with_touch_id: 'LOGIN WITH TOUCH ID',
  register_here: 'Register <b>here</b> if you are not a registered user yet',
  fingerprint_does_not_mach: 'No match, try again!',
  fingerprint_authentication_failed:
    'Authentication failed, you might have to wait before retry!',
  fingerprint_ios_message:
    'Scan your fingerprint on the device scanner to continue',
  dropoff_location: 'Dropoff Location',
  pickup_location: 'Pickup Location',
  enter_phone: 'Phone number eg. +6599256677',
  stats: 'stats',
  incorrect_otp_code: 'Incorrect OTP code',
  completed_jobs: 'COMPLETED TASKS',
  income: 'INCOME',
  loadingStatError: 'Loading statictics failed',
  job_type: 'Job Type',

  history_no_item: "You haven't completed any tasks yet",
  select_vehicle: 'Select vehicle',
  select: 'Select',
  force_vehicle_selection: 'You have to select your vehicle before starting!',
  no_vehicle: 'No vehicle selected',
  detail: 'Detail',
  tasks: 'Tasks',
  // too far dialog
  done_too_far: "You're too far",
  done_too_far_description:
    '\n You don\'t seem to be near enough to the location. \n Are you sure you want to set this step <b>"Done"</b>?',
  yes: 'Yes',
  cancel: 'Cancel',
  complete_task: 'Complete task ?',
  complete_task_description:
    "\n You're about to complete a task. \n Are you sure?",

  task: 'Task',
  task_detail: 'Task detail',

  delivery_exception_dialog_title: 'UNSUCCESSFUL DELIVERY',
  describe: 'Describe',
  photo: 'Photo',
  signature: 'Signature',
  pickup_location: 'Pickup Location',
  dropoff_location: 'Dropoff Location',
  accepted: 'Accepted',
  completed: 'Completed',
  reported: 'Reported',
  more: 'More',
  fetching_direction: 'Fetching direction',
  kilometers: 'kilometers',
  ignore: 'Ignore',
  select_avatar: 'Select avatar',
  week_a: 'W',
  syncing_failed_title: 'Syncing task %s to server failed',
  permission_missing: 'Permissions missing',
  permission_missing_description:
    'Permission missed, please go to setting and enable permissions to make sure that the app work properly!',
  scanner: 'Scanner',
  scanner_guide: 'Scan the QR code one by one',
  bulk_complete_title: 'Error while completing multiple tasks',
  bulk_complete_des: 'Server error %s',
  item_exist: 'Item %s is already in in the list',
  scanned_items: 'Scanned items',
  no_items: 'No items',
  bulk_working: 'Working, please wait...',
  bulk_working_done: 'Processing success!',
  estimated_time: 'Estimated time',
  operation_not_allow: 'Operation not permitted!',
  /** BEGIN: error codes */
  api_errors: {
    backend_error: 'Oops! there was an unexpected error in our system. Please try again later or contact us.',
    /**
     * Error Codes Ledger
      Accounts        (AC): 0001 - 0100
      Articles        (AR): 0101 - 0200
      AuditTrail      (AT): 0201 - 0300
      Allocation      (AL): 0301 - 0400
      Generic Errors  (EC): 0401 - 0500
      Booking         (BK): 0501 - 0600
      Companies       (CO): 0601 - 0700
      Network         (NW): 0701 - 0800
      ServiceType     (ST): 0801 - 0900
      Settings        (SE): 0901 - 1000
      Work            (WO): 1001 - 1100
      Payments        (PM): 1101 - 1200
      Pricing         (PX): 1201 - 1300
      Maps            (MA): 1301 - 1400
      Notification    (NF): 1401 - 1500
      Planner         (PL): 1501 - 1600
      ElasticSearch   (ES): 1601 - 1700
      Documents       (DO): 1701 - 1800
      Partners        (PT): 1801 - 1900
     */

    // Accounts (AC): 0001 - 0100
    AC0001: 'No account exists with that phone number',
    AC0002: 'OTP code expired or invalid',
    AC0003: 'The token was not found.',
    AC0004: 'Reset password token does not exist!',
    AC0005: 'Reset password token is expired, please try again!',

    // Articles (AR): 0101 - 0200
    // AuditTrail (AT): 0201 - 0300
    // Allocation (AL): 0301 - 0400
    AL0301: 'Invalid allocation strategy.',
    AL0302: 'Could not allocate taskgroup.',
    // Booking (BK): 0501 - 0600
    BK0501: 'Items array is empty.',
    BK0502: 'Steps array is empty.',
    BK0503: 'Item_steps array is empty.',
    BK0504: 'Cannot cancel an order with started tasks.',
    BK0505: 'Could not create batch.',
    BK0506: 'Invalid phone number entered.',
    BK0507: 'Not a valid number.',
    BK0508: 'Date/time entered incorrectly. Use format 30/12/2018 18:00.',
    BK0509: 'Invalid country.',
    BK0510: 'Order not found.',
    BK0511: 'Cannot edit order item with started tasks',
    BK0512: 'Cannot edit a cancelled order',
    BK0513: 'Date in the past',
    BK0514: 'Country is missing.',
    BK0515: 'Abbreviations cannot be used. Enter full name',
    BK0516: 'Cell cannot be left blank',
    BK0517: 'Dropoff time cannot before pickup time',
    BK0518: 'Service type not found',
    // Companies (CO): 0601 - 0700,
    CO0601: 'Invalid file type',
    CO0602: 'Invalid Task Group IDs in query',
    // Network (NW): 0701 - 0800
    NW0701: 'There are hubs associated with this region.',
    NW0702: 'There are spokes associated with this hub',
    // ServiceType (ST): 0801 - 0900
    // Settings (SE): 0901 - 1000,
    SE0901: 'Task exception reason does not exist',
    // Work (WO): 1001 - 1100
    WO1001: 'Worker is already approved',
    WO1002: 'There is already a worker assigned to this task group',
    WO1003: 'Worker is Off Duty',
    WO1004: 'Failed to accept tasks',
    WO1005: 'Failed to assign tasks',
    WO1006: 'Failed to unassign tasks',
    WO1007: "Worker has started a task, task group can't be unassigned!",
    WO1008: 'Invalid timezone.',
    WO1009:
      'You must complete or report ongoing tasks, to be able to change to off duty.',
    WO1010: 'You do not own this vehicle.',
    WO1011: 'Sub Task Rule does not exist.',
    WO1012: 'One or more earlier tasks have not been completed',
    WO1013: 'You can not move state from invalidated to assigned',
    WO1014: 'Task already completed or item not meant for worker',
    WO1015: 'One or more sub tasks have not been completed',
    WO1016:
      'Worker has assigned task. Please unassign the task or wait for the driver to completed the task before proceeding',
    // Payments (PM): 1101 - 1200
    PM1101: 'Invalid card details',
    PM1102: 'Payment method is not accepted',
    // Pricing (PX): 1201 - 1300
    PX1201: 'Unable to calculate price',
    PX1202: 'Error fetching price quotes',
    PX1203: 'Invalid price format, price amount should be a number',
    PX1204: 'Invalid currency, currency should follow ISO 4217',
    // Maps (MA): 1301 - 1400
    MA1301: 'Unable to calculate distance',
    MA1302: 'Could not geocode address',
    MA1303: 'No addresses found for this entered text',
    MA1304: 'Unable to get directions - no route found',
    MA1305: 'Invalid geographic coordinates',
    // Notification (NF): 1401 - 1500
    // Planner (PL): 1501 - 1600
    // Search (ES): 1601 - 1700
    ES1601: 'Unable to reach search server',
    // Documents (DO): 1701 - 1800
    DO1701: 'Contains order already invoiced',
    DO1702: 'Contains invalid order price',
    // Partners(PT): 1801 - 1900
    PT1801: 'Invalid CIP',
    PT1802: 'Not a valid request',

    AC0006: 'Detecting company failed'
  }
  /** END: error codes */
}
