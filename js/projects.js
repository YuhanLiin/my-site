//Function which creates the markup for a project box with project json as input
function projectHtml(project){
    var html = '<div class="col-md-4 project-shell"><div class="round-box project-box">'
                + '<h3 class="text-dark">%name%</h3>'
                + '<div class="img-box project-img center-block">'
                + '<img class="img-responsive" src="%image%" alt="Project Image"></div>'
                + '<div class="project-description text-black center-block"> <p>%description%</p> </div>';
    if (project.link){
        html += '<a class="btn btn-default" href="%link%" role="button">To the App!</a>';
    }
    if (project.github){
        html += '<a class="btn btn-default" href="%github%" role="button">To Github!</a>';
    }
    html += '</div></div>';
    return renderHtml(html, project);
}

//Creates gallery
var galleryID = $("#project-gallery");
for (i in gallery){
    galleryID.append(projectHtml(gallery[i]));
}

//Change project-box colour when hovered over
$(".project-box").hover(function(){
    $(this).css("background-color","#e6e6e6");
},
function(){
    $(this).css("background-color","#ffffff");
});

//Sliding animation for gallery elements
var slideTime = 1000;
var fadeTime = 300;
$(".project-box").click(function(){
    var descriptionBox = $(this).children(".project-description");
    var descriptionP = descriptionBox.children('p');
    //Slide box back in and stack the description under the box
    if ($(this).data("slideout")){
        descriptionP.animate({"opacity":"0"}, fadeTime).promise().done(function(){
            descriptionP.delay(slideTime).css("z-index", "-1");
        });
        descriptionBox.delay(fadeTime).animate({"max-height":"0",
                                            "height": "0"}, slideTime);
        $(this).data("slideout", false);
    }
    //Slide box out and stack description on top of the box
    else{
        var height = descriptionP.height();
        descriptionBox.animate({"max-height":height.toString(),
                                "height": height.toString()}, slideTime);
        descriptionP.delay(slideTime).animate({"opacity":"1"}, fadeTime);
        $(this).data("slideout", true);
        descriptionP.css("z-index", "10");
    }
});