function getJournals() {
  $.get('/get-journals', function(data) {
    data.forEach(journal => {
      $('#journals').append(
        `<li>${journal.userName} said ${journal.subject}</li>`
      );
    });
  });
}

$(function() {
  getJournals();

  $('#journal-form').on('submit', function(e) {
    e.preventDefault();
    $.post(
      '/save-journal',
      {
        username: $('#journal-form #uname').val(),
        subject: $('#journal-form #subject').val()
      },
      function(data) {
        $('#journals').empty();
        data.forEach(journal => {
          $('#journals').append(
            `<li>${journal.userName} said ${journal.subject}</li>`
          );
        });
      }
    );
  });
});
