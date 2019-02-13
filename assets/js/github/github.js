var HttpClient = function () {
	this.get = function (aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function () {
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		}

		anHttpRequest.open("GET", aUrl, true);
		anHttpRequest.send(null);
	}
}
var client = new HttpClient();
$(".git").each(function () {
	var toShow = $(this);
	client.get('https://api.github.com/users/' + toShow.attr("user") + '/repos', function (response) {
		var as_JSON = JSON.parse(response);
		as_JSON.forEach(function (repo) {
			var name = repo["name"];
			//Retrive underscore from ALL project name
			name = name.replace(/[^a-z0-9-]/g, " ");
			if (repo["name"] == toShow.attr("repo")) {
				toShow.html(`
                     <img src="./assets/img/github_logo.png" class="img-responsive img-circle img-smaller" alt=""> 
                     <h4> <a href="` + repo["html_url"] + `" target="_blank"><span class="navy">` + name + `</span></a> </h4>
                     <div>` + repo["description"] + ` </div>
                     <div>
                        <a target="_blank" style="width: 65px;" href="` + repo["html_url"] + `" class="btn btn-white btn-xs star"><i class="fa fa-star"></i> ` + repo["stargazers_count"] + `</a> 
                        <a target="_blank" style="width: 65px;" href="` + repo["html_url"] + "/network" + `" class="btn btn-white btn-xs fork"><i class="fa fa-code-fork"></i> ` + repo["forks_count"] + `</a> 
                        <a target="_blank" style="width: 65px;" href="` + repo["html_url"] + "/blob/master/report.pdf" + `" class="btn btn-white btn-xs pdf"><i class="fas fa-file-pdf"></i></a>
                        <div style="height: 10px;"></div>
               		</div>
               `);
			}
		});
	});
});