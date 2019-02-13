$("#form").submit(function (e) {
  e.preventDefault();
  var date = document.getElementById('date').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var location = document.getElementById('location').value;
  var message = document.getElementById('message').textContent;
  var information = document.getElementById('information').value;

  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbzeic5bHhnQJKGDFmuoHizV13jr9B-4FhouXdj_hgIty1KtQWc/exec',
    type: 'POST',
    cache: false,
    beforeSend: function () {
      var html = '<div id="load"><i class="now-ui-icons loader_refresh spin"></i></div>';
      $('.loading').append(html);
    },
    complete: function () {
      $('#load').remove();
    },
    data: {
      'date': date,
      'name': name,
      'email': email,
      'location': location,
      'message': message,
      'information': information
    },
    success: function (msg) {
      var html = `<!-- Modal --> <div class="modal fade" id="modal_success" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">MESSAGE SENT</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> Your message was sent successfully. Thank you for contacting us. </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" onclick="window.location='#';" data-dismiss="modal">Back to home</button> </div> </div> </div> </div>`;
      $('.loading').append(html);
      $('#modal_success').modal(true);
    }
  });
});