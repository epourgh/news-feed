class PageClick extends Scroll {
    constructor(args) {
        super(args);
        this.setBreadcrumb();
    }

    setBreadcrumb() {
        let breadcrumb = document.getElementById("get-breadcrumbs");
        if (this.breadcrumb.boolean === true ) {

            breadcrumb.innerHTML = `<i class="fas fa-arrow-left"></i>`;

            const [pageLimit, filterType, filter, endOfLine, sectionTitle] = [
                this.breadcrumb.pageLimit, 
                this.breadcrumb.filterType, 
                this.breadcrumb.filter, 
                this.breadcrumb.endOfLine, 
                this.breadcrumb.sectionTitle
            ];

            breadcrumb.addEventListener('click', function () {

                const previousPageParams = {
                    pageLimit: pageLimit,
                    filterType:filterType,
                    filter: filter,
                    endOfLine: endOfLine,
                    sectionTitle: sectionTitle
                }

                descriptionToggle3(previousPageParams);
            }, false);

        } else {
            breadcrumb.innerHTML = '';
        }
    }


    setParams(args) {
        this.container.innerHTML = '';
        this.container = document.querySelector(`#${args.id}`);
        this.blockClass = "news-feed";
        this.data = args.json;
        this.pageLimit = args.pageLimit;
        this.filter = args.filter;
        this.filterType = args.filterType;
        this.page = 1;
        this.endOfLine = args.endOfLine;
        this.individualArticle = args.individualArticle;
        this.breadcrumb = args.breadcrumb;
        this.isFirstEntry = true;

        this.requestArticles();
        this.setBreadcrumb();
    }


}