var imageInput = document.getElementById("imageInput");

var preview = document.getElementById("preview");
var result = document.getElementById("result");

var format = document.getElementById("format");
var quality = document.getElementById("quality");
var qualityText = document.getElementById("qualityText");

var convert = document.getElementById("convert");
var download = document.getElementById("download");

var currentImage = null;


// 画質表示
quality.addEventListener("input", function(){

    qualityText.textContent = quality.value;

});


// 画像読み込み
imageInput.addEventListener("change", function(){

    var file = imageInput.files[0];

    if(!file){
        return;
    }


    var reader = new FileReader();


    reader.onload = function(e){

        preview.src = e.target.result;


        currentImage = new Image();

        currentImage.onload = function(){

        };

        currentImage.src = e.target.result;

    };


    reader.readAsDataURL(file);

});



// Uint8Array → Blob
function createBlob(data, type){

    return new Blob(
        [data],
        {
            type:type
        }
    );

}



// BMP生成
function createBMP(canvas){

    var ctx = canvas.getContext("2d");

    var imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


    var pixels = imageData.data;


    var rowSize =
        Math.floor(
            (canvas.width * 3 + 3) / 4
        ) * 4;


    var fileSize =
        54 + rowSize * canvas.height;


    var buffer =
        new ArrayBuffer(fileSize);


    var view =
        new DataView(buffer);



    // BMP Header

    view.setUint8(0,66);
    view.setUint8(1,77);


    view.setUint32(
        2,
        fileSize,
        true
    );


    view.setUint32(
        10,
        54,
        true
    );


    // DIB Header

    view.setUint32(
        14,
        40,
        true
    );


    view.setInt32(
        18,
        canvas.width,
        true
    );


    view.setInt32(
        22,
        canvas.height,
        true
    );


    view.setUint16(
        26,
        1,
        true
    );


    view.setUint16(
        28,
        24,
        true
    );



    var offset = 54;


    for(
        var y = canvas.height - 1;
        y >= 0;
        y--
    ){

        for(
            var x = 0;
            x < canvas.width;
            x++
        ){

            var i =
                (y * canvas.width + x) * 4;


            view.setUint8(
                offset++,
                pixels[i + 2]
            );

            view.setUint8(
                offset++,
                pixels[i + 1]
            );

            view.setUint8(
                offset++,
                pixels[i]
            );

        }


        while(
            offset % 4 !== 0
        ){

            view.setUint8(
                offset++,
                0
            );

        }

    }


    return createBlob(
        buffer,
        "image/bmp"
    );

}



// ICO生成
function createICO(canvas){

    return new Promise(function(resolve){

        canvas.toBlob(function(blob){

            blob.arrayBuffer()
            .then(function(buffer){

                var png = new Uint8Array(buffer);


                var ico =
                    new Uint8Array(
                        png.length + 22
                    );


                var view =
                    new DataView(
                        ico.buffer
                    );


                // ICO Header

                view.setUint16(
                    0,
                    0,
                    true
                );

                view.setUint16(
                    2,
                    1,
                    true
                );

                view.setUint16(
                    4,
                    1,
                    true
                );


                view.setUint8(
                    6,
                    canvas.width >= 256 ?
                    0 :
                    canvas.width
                );


                view.setUint8(
                    7,
                    canvas.height >= 256 ?
                    0 :
                    canvas.height
                );


                view.setUint8(8,0);
                view.setUint8(9,0);


                view.setUint16(
                    10,
                    32,
                    true
                );


                view.setUint32(
                    14,
                    png.length,
                    true
                );


                view.setUint32(
                    18,
                    22,
                    true
                );



                ico.set(
                    png,
                    22
                );


                resolve(
                    createBlob(
                        ico,
                        "image/x-icon"
                    )
                );


            });


        },
        "image/png");

    });

}



// 変換
convert.addEventListener("click", function(){

    if(!currentImage){

        alert("画像を選択してください");
        return;

    }



    var canvas =
        document.createElement("canvas");


    canvas.width =
        currentImage.width;


    canvas.height =
        currentImage.height;


    var ctx =
        canvas.getContext("2d");


    ctx.drawImage(
        currentImage,
        0,
        0
    );



    var blob;


    if(format.value === "bmp"){

        blob =
            createBMP(canvas);


        setResult(blob,"bmp");

    }


    else if(format.value === "ico"){


        createICO(canvas)
        .then(function(data){

            setResult(
                data,
                "ico"
            );

        });


    }


    else{


        var mime =
            "image/png";


        var ext =
            "png";


        if(format.value === "jpeg"){

            mime="image/jpeg";
            ext="jpg";

        }


        if(format.value === "webp"){

            mime="image/webp";
            ext="webp";

        }



        canvas.toBlob(function(data){

            setResult(
                data,
                ext
            );

        },
        mime,
        Number(quality.value));


    }


});




// 結果表示
function setResult(blob, ext){

    var url =
        URL.createObjectURL(blob);


    result.src = url;


    download.href = url;


    download.download =
        "converted-image." + ext;


    download.style.display =
        "inline-block";

}
