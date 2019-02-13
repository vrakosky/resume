$(".career").each(function () {
   var toShow = $(this);
   toShow.html(`
                     <div class="vertical-timeline-icon navy-bg wow rotateIn" style="visibility: visible; animation-name: rotateIn;"> <i class="` + toShow.attr("logo") + `"></i> </div>
                     <div class="vertical-timeline-content wow ` + toShow.attr("animation") + `" style="visibility: visible; animation-name: ` + toShow.attr("animation") + `;">
                        <h4><span>` + toShow.attr("company") + `</span></h4>
                        <p><span class="career-description">` + toShow.attr("description") + `</span></p>
                        <span class="vertical-date"><span>` + toShow.attr("date") + `</span> <br> <small><span>` + toShow.attr("job") + `</span></small> </span> 
                     </div>
               `);
});