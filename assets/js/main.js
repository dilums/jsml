let classifier;
let image;
let model_loaded = false;
$(document).ready(()=>{
    $('#msg_container').html(`<div class="alert alert-primary">Loading Model</div>`);
    classifier = ml5.imageClassifier('MobileNet', ()=>{
        model_loaded = true;
        predict();
      });
    $('#btn_url').click(()=>{
        let url = $('#txt_url').val();
        $('#image').attr('src', url);
        // predict();
    });
});


function predict(){
    if (model_loaded){
    $('#msg_container').html('Predicting');
    image = document.getElementById('image');
      classifier.predict(image,(err, results) => {
          if(err){
            notify_error();
          }else{
            $('#msg_container').html('');
            $('#msg_container').hide();
              let results_list = $('#results_list');
              results_list.html('');
              results.forEach( result =>{
                results_list.append(`<li class="list-group-item">
                <span class="result_id">${result.className}</span><span class="presentage"> : ${result.probability.toFixed(4)} %</span>
                </li>`);
              });
          }
      });

    }
}

function notify_error(){
    $('#msg_container').show();
    $('#results_list').html('');
    $('#msg_container').html(`<div class="alert alert-danger">Error !</div>`);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$('#image')
    .on('load', () => { predict()})
    .on('error', () => { notify_error()});