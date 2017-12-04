var channels = ["PRAAPRIPRO", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(
  function() {
    var clientID;
    var urlWith = "https://api.twitch.tv/kraken/channels/";
    var urlWithout = "https://wind-bow.glitch.me/twitch-api/channels/";
    var url = urlWithout;
    var sel = 3;
    var all = $("[name=sel]");
        
    $("#all").click(function () {
      sel = 3;
      setChecked("all");
      refresh();
    });

    $("#online").click(function () {
      sel = 2;
      setChecked("online");
      refresh();
    });

    $("#offline").click(function () {
      sel = 1;
      setChecked("offline");
      refresh();
    });
    
    $(".sel").hover(function (e) {
        highLight(e, "lightgray");
      },
      function(e) {
        highLight(e, "");
      }
    );
    
    function highLight(e, val) {
      e.currentTarget.previousElementSibling.bgColor = val;
      e.currentTarget.nextElementSibling.bgColor = val;
    }
    
    function setChecked (id) {
      $.each(all, function (index, element) {
        let lid = "#" + element.id + "t";
        if (element.id === id) {
          $(lid).css("color", "orange");
        }
        else {
          $(lid).css("color", "blue");
        }
      });
    };
    
    function setData(val, data) {
      if (data.name && (sel === 3 ? 1 : data.status ? 2 & sel : 1 & sel)) {
        var tr = $("<tr></tr>");
        var td1 = $('<td class="label">' +
                    data.display_name + 
                    (data.logo ?
                      '<img src="' + data.logo + '">' :
                      '<i class="fa fa-ambulance red"></i>'
                    ) +
                    '</td>'
                   );
        var td2 = $('<td class="sel">' +
                    '<a href="https://www.twitch.tv/' + val + '" target="_blank">' +
                    (data.status ?
                      '<i class="fa fa-circle green"></i>' :
                      '<i class="fa fa-circle red"></i>'
                    ) +
                    '</a>' +
                    '</td>'
                   );
        var td3 = $('<td class="st">' +
                    (data.status ? data.status : '') + 
                    '</td>' +
                    '</tr>'
                   );
        
        $(td2).hover(
          function(e) {
            highLight(e, "lightgray");
          },
          function(e) {
            highLight(e, "");
          }
        );
        
        $(tr).append(td1);
        $(tr).append(td2);
        $(tr).append(td3);
        
        $("#main").append(tr);
      }
    }

    function refresh() {
      $("#main").html("");
      channels.forEach(function (val) {
        let args = {
          url: url + val,// + "?api-version=3&callback=?",
          success: function(data,status,xh) {
            setData(val, xh.responseJSON);
          },
          error: function(data,status,xh) {
            setData(val, data.responseJSON);
          }
        };
        if (clientID) {
          args.headers = {
            'Client-ID': clientID
          }
        }
        $.getJSON(args);
      });
    };
    setChecked("all");
    refresh();
  }
);