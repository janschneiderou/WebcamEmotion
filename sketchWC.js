const MODEL_URL = '/libraries/face-api/weights/';
let vid;
let expression;
let btn;
let div;

// function preload() {
//     faceapi.loadSsdMobilenetv1Model(MODEL_URL)
//     faceapi.loadFaceLandmarkModel(MODEL_URL)
//     faceapi.loadFaceRecognitionModel(MODEL_URL)
//     faceapi.loadFaceExpressionModel(MODEL_URL)
// }

function setup() {
    textAlign(LEFT);
    div = createDiv('<br> please wait while face-api models are loading...');
    
    createCanvas(320, 240).parent('myCanvas');
    
    // use an async callback to load in the models and run the getExpression() function
    vid = createCapture(VIDEO, async () => {
            await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
            await faceapi.loadFaceLandmarkModel(MODEL_URL);
            await faceapi.loadFaceRecognitionModel(MODEL_URL)
            await faceapi.loadFaceExpressionModel(MODEL_URL);
            div.elt.innerHTML = '<br>model loaded!';
            getExpression();
    }).parent('myCanvas');
    vid.size(320, 240);
    // vid.hide();
}



async function getExpression(){
   // expression = await faceapi.detectAllFaces(vid.elt).withFaceExpressions();
    expression = await faceapi.detectSingleFace(vid.elt).withFaceExpressions()
    getExpression();
  
}


function draw() {
    background(0)
    // image(vid,0,0)
     //console.log(expression)
    if(expression){
          console.log(expression);
        for( i=0; i<7;i++)
        {
            var exp= expression.expressions[i].expression;
            var prob = expression.expressions[i].probability;
            console.log("Expression: " +exp  +" Probability:" + prob );
            fill(255);
            textSize(12);
            //text("Expression: " +exp  +" Probability:" + prob );
            text("Expression: " +exp  +" Probability:" + prob , 10, i*20+30 );
        }
        
        
        if(expression.length > 0){
     
        const {expressions} = expression[0];
        expressions.forEach(element => console.log(element));
        // div.elt.innerHTML = '';
        
      //  expressions.forEach( (item, idx) => {
        //    console.log(item[0]);
          //  const {expression, probability} = item;
        //    fill(255)
        //    // text(`${expression}: ${probability}`, 20, idx*20 )
          //  textSize(12)
        //    text(`${expression}:`, 70, idx*20 + 20 )
        //    const val = map(probability, 0, 1, 0, width/2)
          //  rect(80, idx*20 +10 , val, 15)
        //    // div.elt.innerHTML += `${expression}: ${probability} <br>`
        //})
        }
        
    }
}