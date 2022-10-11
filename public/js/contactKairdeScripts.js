
function onChangeEmail() {
    let value = document.getElementById('ddlViewByEmail').value
    const nameTarget = document.getElementById('email')
    if(value !== 'Use Saved Info') {
      nameTarget.value = value
    } else {
      nameTarget.value = ''
    }
    renderPreview(false)
}
function onChangePhone() {
    let value = document.getElementById('ddlViewByPhone').value
    const nameTarget = document.getElementById('phone')
    if(value !== 'Use Saved Info') {
      nameTarget.value = value
    } else {
      nameTarget.value = ''
    }
    renderPreview(false)
}
function onChangeTitle() {
    let value = document.getElementById('ddlViewByTitle').value
    const nameTarget = document.getElementById('title')
    nameTarget.value = value
    renderPreview(false)
}

function onChangeName() {
    let value = document.getElementById('ddlViewByName').value
    const nameTarget = document.getElementById('name')
    if(value !== 'Use Saved Info') {
        nameTarget.value = value
    } else {
        nameTarget.value = ''
    }
    renderPreview(false)
}