

function createHtml(e,name){

    let data1 = [],data2 = [];
    data = e.features[0].properties;
    let idx_skip = Object.keys(data).length-20;
    for (var property in data) {
        if (e.features[0].layer.id=="naselja-srbija" || e.features[0].layer.id=="opstina-srbija" ){
            if(["naselje_ime","naselje_imel","naselje_maticni_broj","naselje_povrsina","objectid","opstina_ime","opstina_imel","opstina_maticni_broj", "Важећи_sum","Гласали _sum","Неважећи _sum","Неупотреб-qени _sum","Примqени _sum","У гласачкој кутији_sum","Уписани бирачи _sum","Рбр. бирачког места _sum"].indexOf(property)>=0){
                continue;
            }
        }else if ( ! data.hasOwnProperty(property) || idx_skip!=0 ) {
            idx_skip=idx_skip-1;
            continue;
        }
        
        data1.push(property);
        data2.push(data[property]);
        
        }

    var data = [{
        values: data2,
        labels: data1,
        type: 'pie',
        insidetextorientation: "radial",
        textfont: { 
            size: 10
        },
        hoverlabel:{
            font:{
                size: 9
            }
        },

        //automargin: true,
        //margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        showlegend: false
    }];

    var layout = {
        //title: "<a target=\"_blank\" href=\"https://sr.wikipedia.org/wiki/"+ name.replace(/\s/g, "_").toLowerCase()  +"\">" + name + "</a>",
        height: 200,
        width: 200,
        //paper_bgcolor:"rgb(0,0,0,0)",
        paper_bgcolor:"rgb(255,255,255,0)",
        margin: {"b":0,"r":0,"t":0,"l":0}

      };
      //let html = document.getElementById("pieChart").innerHTML;
      let html = "<strong>"+name+"</strong>";//document.getElementById("pieChart").innerHTML;
      Plotly.newPlot('pieChart', data, layout);

    return html;
} 
popup.on('close', function(e) {
    document.querySelector("#pieChart").style.display="none";
})
popup.on('open', function(e) {
    document.querySelector("#pieChart").style.display="block";
})
  