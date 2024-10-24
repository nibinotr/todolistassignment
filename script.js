$(document).ready(function() {
  $('#loginButton').click(function() {
      const username = $('#username').val();
      const password = $('#password').val();
      
      if (username === 'admin' && password === '12345') {
          $('#loginForm').hide();
          $('#todoListPage').show();
      } else {
          $('#errorMessage').text('Invalid credentials. Please try again.');
      }
  });

  $('#logoutButton').click(function() {
      $('#todoListPage').hide();
      $('#loginForm').show();
      $('#errorMessage').text('');
      $('#todoBody').empty();
      $('#todoTable').hide();
  });

  $('#fetchTodosButton').click(function() {
      fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(data => {
              $('#todoBody').empty();
              data.forEach(todo => {
                  $('#todoBody').append(`
                      <tr>
                          <td>${todo.id}</td>
                          <td>${todo.title}</td>
                          <td>
                              <input type="checkbox" ${todo.completed ? 'checked disabled' : ''} class="task-checkbox">
                          </td>
                      </tr>
                  `);
              });
              $('#todoTable').show();
              checkCheckboxes();
          });
  });

  function checkCheckboxes() {
      let completedCount = 0;
      $('.task-checkbox').change(function() {
          if ($(this).is(':checked')) {
              completedCount++;
              if (completedCount === 5) {
                  new Promise((resolve) => {
                      setTimeout(() => {
                          resolve();
                      }, 1000);
                  }).then(() => {
                      alert("Congrats, you have completed 5 tasks!");
                  });
              }
          } else {
              completedCount--;
          }
      });
  }
});
