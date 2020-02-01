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

$('#period').change(function() {
  // fetch('http://localhost:3000/log/'+$('#period').val())
  // .then(response => response.json())
  // .then(data => {
  //   console.log('data');
  // });
  $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/log/'+$('#period').val(),
      dataType: 'json',
      success: function(timeSpent){
        console.log('hdhdhjs');
        $('#display-result').append(timeSpent);
      }
  });
  // $.ajax({
  //     type: 'GET',
  //     url: 'http://localhost:3000/log/'+$('#period').val(),
  //     dataType: 'json'
  // }).done(function(timeSpent){
  //   console.log('hdhdhjs');
  //   $('#display-result').append(timeSpent);
  // });
//   $.get('http://localhost:3000/log/'+$('#period').val(), function(data){
//     $('#display-result').append(data);
//     alert('hdhdhjs');
//     console.log(data);
//   }, "json");
});