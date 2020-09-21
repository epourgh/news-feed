(async () => {

    let response = await fetch('./index.json');
    let jsonData = await response.json();

    const newsFeed = new NewsFeed({
        id: "news-section",
        json: jsonData.data,
        pageLimit: 3,
        filter: "ALL",
        filterType: "secondTag",
        endOfLine: "",
        breadcrumb: {boolean: false}
    });

    document.getElementById("get-latest").addEventListener("click", () => {
        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: 3,
            filter: "ALL",
            filterType: "secondTag",
            endOfLine: "",
            breadcrumb: {boolean: false}
        });
    });

    document.getElementById("get-reports").addEventListener("click", () => {
        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "report",
            filterType: "tag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: {boolean: false}
        });
    });

    document.getElementById("get-editorials").addEventListener("click", () => {
        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "editorial",
            filterType: "tag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: {boolean: false}
        });
    });

    document.getElementById("get-all").addEventListener("click", () => {
        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "ALL",
            filterType: "secondTag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: {boolean: false}
        });
    });

    descriptionToggle = (dataId) => {
        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? 'Collapse Quick Read' : 'Quick Read';
    }


    descriptionToggle2 = (dataId, previousPageParams) => {

        console.log(jsonData.data);
        console.log(`filtertype: ${previousPageParams.endOfLine}`)

        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            filter: dataId,
            filterType: "id",
            endOfLine: "",
            breadcrumb: {
                boolean: true, 
                pageLimit: previousPageParams.pageLimit, 
                filterType: previousPageParams.filterType, 
                filter: previousPageParams.filter,
                endOfLine: previousPageParams.endOfLine
            }
        });

        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? '' : 'Quick Read';
    }


    descriptionToggle3 = (previousPageParams) => {

        newsFeed.setParams({
            id: "news-section",
            json: jsonData.data,
            pageLimit: previousPageParams.pageLimit,
            filter: previousPageParams.filter,
            filterType: previousPageParams.filterType,
            endOfLine: previousPageParams.endOfLine,
            breadcrumb: {boolean: false}
        });

    }
 
    authorToggle = (author) => {
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
            filterType: contentUpdate.filterType || "secondTag",
            endOfLine: contentUpdate.endOfLine || "",
            breadcrumb: contentUpdate.breadcrumb || { boolean: false }
        })
    }


})();
