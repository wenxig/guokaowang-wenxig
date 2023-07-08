use tauri::Manager;
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
async fn fs_isjaoji(
    top: usize,
    height: usize,
    width: usize,
    s_top: usize,
    s_left: usize,
    s_height: usize,
    sl: usize
) -> Result<bool, ()> {
    let bottom: usize = top + height + 72;
    let s_bottom: usize = s_top + s_height + 36 + sl;
    Ok((bottom >= s_top && bottom <= s_bottom) && width >= s_left)
}
fn main() {
    tauri::Builder::default()
        // Add this line
        .invoke_handler(tauri::generate_handler![close_splashscreen, fs_isjaoji])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
