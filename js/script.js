var users = users;

window.onload = function() {
    var userCount = users.length;
    
    initializeTotal(userCount);
    initializePagination(userCount);
    initializeUsersList(users, 1);
}

function initializeUsersList(users, pageNum) {
    var list = document.getElementById('userList');
    var pagination = document.getElementById('pagination');
    var paginationNum = pagination.getElementsByTagName('li').length;
    var pageAnchor = document.getElementsByClassName('pageAnchor');
    var start = (pageNum * 10) - 9;
    var end = pageNum * 10;

    //Reset list
    list.innerHTML = '';

    //Reset pagination
    for(var i = 0; i < pageAnchor.length; i++) {
        pageAnchor[i].className = pageAnchor[i].className.replace(' active', '');
    }

    for(var i = 0; i < users.length; i++) {
        if(i  + 1 >= start && i < end) {
            var name = users[i].name;
            var image = users[i].image;
            var joined = users[i].joined;

            var li = document.createElement('li');
            li.className = 'contact-item cf';
            var content = document.createElement('div');
            content.className ='contact-details';
            var imgLine = `<img class="avatar" src="${image}">`;
            var nameLine = `<h3>${name}</h3`;
            content.innerHTML = imgLine + nameLine;
            var joinDiv = document.createElement('div');
            joinDiv.className = 'joined-details';
            joinDiv.innerHTML = `<span class="date">Joined ${joined}</span>`;

            li.appendChild(content);
            li.appendChild(joinDiv);

            list.appendChild(li);
        }
    }

    document.getElementById(`page${pageNum}`).className += ' active';
}

function initializeTotal(userCount) {
    var total = document.getElementById('total');
    total.innerHTML = 'Total: ' + userCount;
}

function initializePagination(userCount) {
    var division = userCount / 10;
    var modulo = userCount % 10;
    var startIndex = 1;

    var pagination = document.getElementById('pagination');

    if(division == 0) {
        var pageNum = document.createElement('li');
        pageNum.innerHTML = `<a>${startIndex}</a>`;
        pagination.appendChild(pageNum);
    } else if(division > 0) {
        if(modulo == 0) {
            for(var i = 0; i < division; i++) {
                var li = document.createElement('li');
                var anchor = document.createElement('a');
                anchor.innerHTML = `${i + 1}`;
                anchor.className = 'pageAnchor';
                anchor.id = `page${i + 1}`;
                anchor.setAttribute('onclick', `pageMove(${i + 1})`);
                li.appendChild(anchor);
                pagination.appendChild(li);
            }
        } else {
            for(var i = 0; i <= division; i++) {
                var li = document.createElement('li');
                var anchor = document.createElement('a');
                anchor.innerHTML = `${i + 1}`;
                anchor.className = 'pageAnchor';
                anchor.id = `page${i + 1}`;
                anchor.setAttribute('onclick', `pageMove(${i + 1})`);
                li.appendChild(anchor);
                pagination.appendChild(li);
            }
        }
    }
}

function pageMove(pageNum) {
    initializeUsersList(users, pageNum);
}