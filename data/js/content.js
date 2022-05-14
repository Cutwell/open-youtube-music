// access tabPreference options
var tabPreference;

// fetch chrome storage for settings
chrome.storage.sync.get({
    tabPreference: 'current_tab',
}, function (items) {
    tabPreference = items.tabPreference;

    // callback
    if(document.readyState === 'complete') {
        composeDOM();
    }

    // poll if not yet loaded
    var interval = setInterval(function() {
        let nav_check = document.getElementById('top-level-buttons-computed');
        if(document.readyState === 'complete' && typeof(nav_check) != 'undefined' && nav_check != null) {
            clearInterval(interval);
            composeDOM();
        }    
    }, 100);
});

function composeDOM() {
    /*
    <button class="youtubemusic" aria-label="Open in Youtube Music">
        <svg class="youtubemusic-icon">
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z"></path>
        </svg>
        <span class="youtubemusic-tagline">Music</span>
    </button>
    */

    // contruct the additional button
    var button = document.createElement('button');
    button.classList.add("youtubemusic");

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let svg_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.classList.add("youtubemusic-icon");
    svg_path.setAttribute("d", "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z")
    svg.appendChild(svg_path);

    let span = document.createElement('span');
    span.classList.add("youtubemusic-tagline");
    let span_text = document.createTextNode("Music");
    span.appendChild(span_text);

    button.appendChild(svg);
    button.appendChild(span)

    if (tabPreference == "current_tab") {
        // add onclick redirect in current tab
        button.onclick = function() {
            window.location.href = window.location.href.replace(
                "www.youtube.com",
                "music.youtube.com"
            );
        }
    }
    else if (tabPreference == "new_tab") {
        // add onclick open in new tab
        button.onclick = function() {
            window.open(
                window.location.href.replace(
                    "www.youtube.com",
                    "music.youtube.com"
                ),
                "_blank"
            );
        }
    }

    // insert into DOM //
    // locate menu
    let nav = document.getElementById('top-level-buttons-computed');

    // prepend element at start of button list
    if (nav !== undefined) {
        nav.insertBefore(button, nav.children[2]);
    }
}

