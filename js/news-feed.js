class NewsFeed {
    constructor(args) {
        this.container = document.querySelector(`#${args.id}`);
        this.blockClass = "news-feed";
        this.contentProperties = null;
        this.status = null;
        this.page = 1;
        this.pageLimit = args.pageLimit;
        this.data = args.json;
        this.filterType = args.filterType;
        this.filter = args.filter;
        this.endOfLine = args.endOfLine;
        this.individualArticle = args.individualArticle;
        this.breadcrumb = args.breadcrumb;
        this.isFirstEntry = true;
    }
}