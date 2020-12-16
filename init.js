(async () => {

    let response = await fetch('./index.json');
    let jsonData = await response.json();

    document.getElementById('section-title').innerHTML = `Latest 3 articles`;

    const newsFeed = new NewsFeed({
        id: "news-section",
        json: jsonData.data,
        pageLimit: 2,
        filter: "ALL",
        filterType: "defaultTag",
        endOfLine: "",
        individualArticle: false,
        breadcrumb: {boolean: false}
    });

    descriptionToggle = (dataId) => {
        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? 'Collapse Quick Read' : 'Quick Read';
    }


    descriptionToggle2 = (dataId, contentTitle, previousPageParams) => {

        document.getElementById('section-title').innerHTML = `${contentTitle}`;

        newsFeedUpdate({
            filter: dataId,
            filterType: "id",
            individualArticle: true,
            breadcrumb: {
                boolean: true, 
                pageLimit: previousPageParams.pageLimit, 
                filterType: previousPageParams.filterType, 
                filter: previousPageParams.filter,
                endOfLine: previousPageParams.endOfLine,
                sectionTitle: previousPageParams.sectionTitle
            }
        });

        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? '' : 'Quick Read';
    }


    descriptionToggle3 = (previousPageParams) => {

        document.getElementById('section-title').innerHTML = previousPageParams.sectionTitle;

        newsFeedUpdate({
            pageLimit: previousPageParams.pageLimit,
            filter: previousPageParams.filter,
            filterType: previousPageParams.filterType,
            endOfLine: previousPageParams.endOfLine
        });
    }
 
    authorToggle = (author) => {

        document.getElementById('section-title').innerHTML = `Posts by ${author}`;

        newsFeedUpdate({
            filter: author,
            filterType: "author",
            endOfLine: "That is all the author has posted."
        });
    }

    newsFeedUpdate = (contentUpdate) => {
        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: contentUpdate.pageLimit || Infinity,
            filter: contentUpdate.filter || "ALL",
            filterType: contentUpdate.filterType || "defaultTag",
            endOfLine: contentUpdate.endOfLine || "",
            individualArticle: contentUpdate.individualArticle || false,
            breadcrumb: contentUpdate.breadcrumb || { boolean: false }
        })
    }

})();

document.getElementById("top-nav-latest").addEventListener("click", () => {
    getLatest()
});
document.getElementById("side-nav-latest").addEventListener("click", () => {
    getLatest()
});


getLatest = () => {
    document.getElementById('section-title').innerHTML = `Latest 3 Articles`;

    newsFeedUpdate({
        pageLimit: 2
    });
}

document.getElementById("top-nav-reports").addEventListener("click", () => {
    getReports()
});

document.getElementById("side-nav-reports").addEventListener("click", () => {
    getReports()
});

getReports = () => {
    document.getElementById('section-title').innerHTML = `Reports`;

    newsFeedUpdate({
        filter: "report",
        filterType: "tag",
        endOfLine: "You have scrolled to the bottom of the feed."
    });
}

document.getElementById("top-nav-editorials").addEventListener("click", () => {
    getEditorials()
});
document.getElementById("side-nav-editorials").addEventListener("click", () => {
    getEditorials()
});

getEditorials = () => {
    document.getElementById('section-title').innerHTML = `Editorials`;

    newsFeedUpdate({
        filter: "editorial",
        filterType: "tag",
        endOfLine: "You have scrolled to the bottom of the feed."
    });
}

document.getElementById("top-nav-all").addEventListener("click", () => {
    getAll()
});
document.getElementById("side-nav-all").addEventListener("click", () => {
    getAll()
});


getAll = () => {
    document.getElementById('section-title').innerHTML = `All Articles`;
    
    newsFeedUpdate({
        endOfLine: "You have scrolled to the bottom of the feed."
    });
}


document.getElementById("search-input").addEventListener("keyup", () => {

    var input = document.getElementById('search-input').value;

    document.getElementById('section-title').innerHTML = (input == '') ? `All Articles` : `Searching for <i>'${input}'</i>`;
    const filter = (input == '')?'ALL':input;
    const filterType = (input == '')?'defaultTag':'title';    


    newsFeedUpdate({
        filter: filter,
        filterType: filterType,
        endOfLine: "You have scrolled to the bottom of the feed."
    });
});