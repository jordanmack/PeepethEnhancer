(function() {
    'use strict';

    const injectStyles = function()
    {
        const css =
        `
            <style>
                body.dark { background: #141d26; }
                body.dark #deeplinked-user-tabs { background: #141d26; }
                body.dark #deeplinked-user-tabs .acctShowBar { background: #243447; }
                body.dark #deeplinked-user-tabs .tabs-panel.is-active { background: #141d26; }
                body.dark #deeplinked-user-tabs .acctTab.tabs-title.is-active a { background: transparent; }
                body.dark { color: white; }
                body.dark #header { background: #243447; box-shadow: none; }
                body.dark #headerNavLinks a { color: white; }
                body.dark #newMessageContent { background: #141d26; color: white; }
                body.dark .newPostContentFAKE { background: #141d26; color: white; }
                body.dark .newPostHolder { background: #1b3448; padding: 5px; }
                body.dark .postModal.reveal { background: #1b2836; }
                body.dark .sidebarBox { background: #1b2836; }
                body.dark #accountSidebar { background: #1b2836; }
                body.dark #userSidebar { background: transparent; }
                body.dark #userSidebar #usSidebarRealName { color: white; }
                body.dark #userSidebar a { color: white; }
                body.dark #sidebarDetailsHolder #sidebarRealName { color: white; }
                body.dark .message { background: #1b2836; border-color: #141d26; }
                body.dark .message:hover { border-left: 2px solid #ff5501; }
                body.dark .messageHeader .acctRealName { color: white; }
                body.dark #peepethEnhancerSidebar label { color: #b8b8b8; }
                body.dark a.accountRealName { color: white; }
                body.dark #mmMessageHolder>.message:hover { background-color: transparent !important; }
                body.dark #mmMessageHolder>.message:hover .message { background-color: transparent !important; }
                body.dark #mmReplyToMessageContent { background-color: #141d26; color: white; }
                body.dark #userMessagesPanel #messages { background-color: #141d26; color: white; }
                body.dark #userFollowingContent .account { background-color: #1b2836; color: white; }
                body.dark #userFollowersPanel .account { background-color: #1b2836; color: white; }
                body.dark #notificationsHolder .notification { background-color: #1b2836; border-color: transparent; color: white; }
                body.dark #notificationsHolder .notification a { color: white; }
                body.dark #searchString { background: #141d26; color: white; }
                body.dark #headerAvatarHolder .dropdown-content { background: #243447; color: white; }
                body.dark #headerAvatarHolder .dropdown-content a:hover { background: #1da1f2; }
                body.dark #batchSignModal { background: #1b2836; }
                body.dark #batchSignModal a { color: white; }

                #headerImg .show-for-medium img.dark { display: none; }
                body.dark #headerImg .show-for-medium img { display: none; }
                body.dark #headerImg .show-for-medium img.dark { display: inline-block; }
                #headerImg .hide-for-medium img.dark { display: none; }
                body.dark #headerImg .hide-for-medium img { display: none; }
                body.dark #headerImg .hide-for-medium img.dark { display: inline-block; }

                body.hideBadges .messageAvatarHolder a { display: none !important; }
                body.hideBadges .messageAvatarHolder a.accountAvatar { display: inline-block !important; }
            </style>
        `;
        jQuery(css).appendTo("body");

        // Add opaque logo for dark mode.
        jQuery("#headerImg .show-for-medium img").clone().attr("src", "https://i.imgur.com/wbPOUzS.png").addClass("dark").appendTo(jQuery("#headerImg .show-for-medium"));
        jQuery("#headerImg .hide-for-medium img").clone().attr("src", "https://i.imgur.com/wbPOUzS.png").addClass("dark").appendTo(jQuery("#headerImg .hide-for-medium"));
    };
    injectStyles();

    const updateDarkMode = function()
    {
        if(Cookies.get("peEnableDarkMode") === "true")
            jQuery("body").addClass("dark");
        else
            jQuery("body").removeClass("dark");
    };
    updateDarkMode();

    const updateHideBadges = function()
    {
        if(Cookies.get("peHideBadges") === "true")
            jQuery("body").addClass("hideBadges");
        else
            jQuery("body").removeClass("hideBadges");
    };
    updateHideBadges();

    const createSidebarControls = function()
    {
        const newHtml =
        `
            <div class="sidebarBox hidden show-for-medium" id="peepethEnhancerSidebar" style="display: block;">
                <div class="sidebarTitle">Peepeth Enhancer</div>
                <label><input type="checkbox" id="peShowPolitics" value="1">Auto Show #Politics</label>
                <label><input type="checkbox" id="peShowNsfw" value="1">Auto Show #NSFW</label>
                <label><input type="checkbox" id="peShowNew" value="1">Auto Show New Peeps</label>
                <label><input type="checkbox" id="peHideBadges" value="1">Hide User Avatar Badges</label>
                <label><input type="checkbox" id="peEnableDarkMode" value="1">Enable Dark Mode</label>
            </div>
        `;
        jQuery("#unsavedActionsSidebarHolder").after(newHtml);

        const ids = ["peShowPolitics", "peShowNsfw", "peShowNew", "peEnableDarkMode", "peHideBadges"];
        ids.forEach(function(id)
        {
            const $this = jQuery("#" + id);

            // Populate checkboxes.
            $this.prop("checked", Cookies.get(id) === "true");

            // Update cookies on checkbox change.
            $this.on("change", function(e)
            {
                Cookies.set(id, String(jQuery(this).prop("checked")), { expires: 365 });

                if(id === "peEnableDarkMode")
                    updateDarkMode();

                if(id === "peHideBadges")
                    updateHideBadges();
            });
        });
    };
    createSidebarControls();

    const clickLoop = function()
    {
        if(jQuery("#peShowPolitics").prop("checked"))
            jQuery("a.politicsShow:visible").click();

        if(jQuery("#peShowNsfw").prop("checked"))
            jQuery("a.nsfwShow:visible").click();

        if(jQuery("#peShowNew").prop("checked") && jQuery(".loadNewPeepsHolderMobile>a").is(":visible"))
            showNewPeeps();
    };
    clickLoop();
    setInterval(clickLoop, 1000);
})();