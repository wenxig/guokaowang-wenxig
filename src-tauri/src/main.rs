use tauri::Manager;
// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

// Register the command:
fn main() {
  tauri::Builder::default()
    // Add this line
    .invoke_handler(tauri::generate_handler![close_splashscreen,set_window_top])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
fn set_window_top(val:Boolean) {
  let app = tauri::generate_context!().app_handle;
  let window = app.get_window("main").unwrap(); // 以窗口的名称获取窗口句柄
  window.set_always_on_top(val); // 将窗口置顶
}
