$('#start-app').click(function() {
  $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/start'
  });
  console.log('Application started');
});

$('#stop-app').click(function() {
  $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/stop'
  });
  console.log('Application stop');
});