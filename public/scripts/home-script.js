$( document ).ready(function() {
    
    // Creating feed
    $('#submit_feed').click(function() {
        var j;
        var feed = $('#feed_content').val();
        if(feed == '') console.log("can't be empty");
        else {
            
            $.ajax({
                url : "/feed/submit",
                type: "POST",
                data : {feed: feed},
                beforeSend: function() {
                    $('.loading').show();
                },
                success: function(data, textStatus, jqXHR)
                {
                     data.forEach(function(item) {
                       var html = '<div class="card card-widget" id="'+item._id+'"> <div class="card-header"> <div class="user-block"> <img class="img-circle" src="/images/common/default-avatar.png" alt="User Image"> <span class="username"><a href="#">'+capitalize(item.data.user.username)+'</a></span> <span class="description"><i class="far fa-clock mr-1" style=" vertical-align: middle;"></i>'+item.extra.time_ago+'</span> </div><div class="card-tools"> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown"> <span class="sr-only">Toggle Dropdown</span> <div class="dropdown-menu" role="menu"> <a class="dropdown-item" href="#">Edit</a> <a class="dropdown-item" href="#">Report</a> <div class="dropdown-divider"></div><a class="dropdown-item" href="#">Delete</a> </div></button> </div></div></div><div class="card-body"> <p>'+item.data.feed_content+'</p></div><div class="card-footer card-comments border-top"> <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i> Share</button> <button type="button" class="btn btn-default btn-sm"><i class="far fa-thumbs-up"></i> Like</button> <span class="float-right text-muted">45 likes - 2 Shares</span> </div></div>';
                        $('.loaded_feeds').prepend(html);
                    });
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    console.log(errorThrown);
                },
                complete: function() {
                    $('.loading').hide();
                },
            });
        }
    });
    
    // Loading post on some interval
    var i = 0;
    $.ajax({
        url : "/feed/getAll",
        type: "GET",
        beforeSend: function() {
            // setting a timeout
            $('.loading').show();
            i++;
        },
        success: function(result, textStatus, jqXHR)
        {
            var data = result.docs;
            
            data.forEach(function(res) {
                var item = res.item;
                var html = '<div class="card card-widget" id="'+item._id+'"> <div class="card-header"> <div class="user-block"> <img class="img-circle" src="'+item.user.avatar+'" alt="User Image"> <span class="username"><a href="#">'+item.user.username+'</a></span> <span class="description"><i class="far fa-clock mr-1" style=" vertical-align: middle;"></i>'+res.extra.time_ago+'</span> </div><div class="card-tools"> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown"> <span class="sr-only">Toggle Dropdown</span> <div class="dropdown-menu" role="menu"> <a class="dropdown-item" href="#">Edit</a> <a class="dropdown-item" href="#">Report</a> <div class="dropdown-divider"></div><a class="dropdown-item" href="#">Delete</a> </div></button> </div></div></div><div class="card-body"> <p>'+item.feed_content+'</p></div><div class="card-footer card-comments border-top"> <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i> Share</button> <button type="button" class="btn btn-default btn-sm"><i class="far fa-thumbs-up"></i> Like</button> <span class="float-right text-muted">45 likes - 2 Shares</span> </div></div>';
                $('.loaded_feeds').append(html);
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(errorThrown);
        },
        complete: function() {
            i--;
            if (i <= 0) {
                $('.loading').hide();
            }
        },
    });
});