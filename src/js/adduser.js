checkLogin('adduser')

function __user_addNew() {
	$('form.validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			alert('Vui lòng kiểm tra lại thông tin')
		} else {
			var newData = JSON.stringify({
				username: $('#username').val(),
				password: md5($('#password').val()),
				email: $('#email').val(),
				fullname: $('#fullname').val(),
				permision: {
					dashboard: $('#dashboard').prop("checked"),
					createtask: $('#createtask').prop("checked"),
					deltassk: $('#deltassk').prop("checked"),
					modifytask: $('#modifytask').prop("checked"),
					adduser: $('#adduser').prop("checked"),
					userlist: $('#userlist').prop("checked"),
					settings: $('#settings').prop("checked"),
					archivetask: $('#archivetask').prop("checked"),
					viewtask: $('#viewtask').prop("checked"),
					movetask: $('#movetask').prop("checked"),
					viewuser: $('#viewuser').prop("checked")
				},
				settings: {
					editor: true,
					pagesize: 5,
					activenumberstep1drag: 3,
					activenumberstep2drop: 1,
					oneway: true
				}
			})
			$.ajax({
				url: "/newuser",
				type: "POST",
				async: true,
				dataType: "json",
				cache: !0,
				data: newData,
				contentType: "application/json; charset=utf-8",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", 'Bearer ' + Cookies.get('Token'));
				},
				error: function (jqXHR, textStatus, errorThrown) {
				},
				complete: function (data) {
					if (data.responseText === 'error'){
						alert('Đã tồn tại tài khoản này')
					} else {
						alert('Đã cập nhật thành viên mới!')
						toastrMsg('Cập nhật hoàn tất', 'Cập nhật', 2000)
						$('#adduserfrm')[0].reset();
					}
				}
			})
		}
		return false
	})
}

$(document).ready(function () {
	__user_addNew()
});
