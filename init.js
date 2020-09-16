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
        breadcrumb: [false]
    });

    document.getElementById("get-latest").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            pageLimit: 3,
            filter: "ALL",
            filterType: "secondTag",
            endOfLine: "",
            breadcrumb: [false]
        });
    });

    document.getElementById("get-reports").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "report",
            filterType: "tag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: [false]
        });
    });

    document.getElementById("get-editorials").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "editorial",
            filterType: "tag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: [false]
        });
    });

    document.getElementById("get-all").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            pageLimit: Infinity,
            filter: "ALL",
            filterType: "secondTag",
            endOfLine: "You have scrolled to the bottom of the feed.",
            breadcrumb: [false]
        });
    });

    descriptionToggle = (dataId) => {
        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? 'Collapse Quick Read' : 'Quick Read';
    }


    descriptionToggle2 = (dataId, pageLimit, filterType, filter) => {

        console.log(jsonData.data);
        console.log(`filtertype: ${filterType}`)

        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            filter: dataId,
            filterType: "id",
            endOfLine: " ",
            breadcrumb: [
                true, pageLimit, filterType, filter
            ]
        });

        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? '' : 'Quick Read';
    }


    descriptionToggle3 = (pageLimit, filterType, filter) => {

        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            pageLimit: pageLimit,
            filter: filter,
            filterType: filterType,
            endOfLine: " ",
            breadcrumb: [false]
        });

    }


})();
