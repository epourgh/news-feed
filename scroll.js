class NewsFeed {
    constructor(args) {
        this.container = document.querySelector(`#${args.id}`);
        this.blockClass = "news-feed";
        this.cardContent = null;
        this.status = null;
        this.page = 1;
        this.newsItemPerRequest = 1;
        this.pageLimit = args.pageLimit;
        this.data = args.json;
        this.filterType = args.filterType;
        this.filter = args.filter;
        this.endOfLine = args.endOfLine;
        this.breadcrumb = args.breadcrumb;

        this.observer = new IntersectionObserver(
            (entries, self) => {
                console.log(self)
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // since only the last loaded image should be observed, there will be “baton passing” of being observed
                        self.unobserve(entry.target);

                        // keep adding feedItems until all images on have been loaded
                        let feedItems = this.getFeedItems(),
                            feedCount = feedItems.length,
                            numOfFeedItemsAtStartOfPage = (this.page - 1) * this.newsItemPerRequest,
                            contentIndex = feedCount - numOfFeedItemsAtStartOfPage;

                        if (feedCount < numOfFeedItemsAtStartOfPage + this.cardContent.length) {
                            this.addFeedItem(this.cardContent[contentIndex], this.pageLimit, this.filterType, this.filter);
                            // observe the next card
                            feedItems = this.getFeedItems();
                            self.observe(feedItems[feedCount]);

                        } else {
                            ++this.page;
                            this.requestImages(this.imagesPerRequest, this.page);
                        }
                    }
                });
            }
        );
        this.setBreadcrumb();
        this.requestImages(this.newsItemPerRequest);
    }

    setBreadcrumb() {
        let breadcrumb = document.getElementById("get-breadcrumbs");
        if (this.breadcrumb[0] === true ) {

            breadcrumb.innerHTML = `<i class="fas fa-arrow-left"></i>`;

            const [pageLimit, filterType, filter] = [this.breadcrumb[1], this.breadcrumb[2], this.breadcrumb[3]];

            breadcrumb.addEventListener('click', function () {
                descriptionToggle3(pageLimit, filterType, filter);
            }, false);

        } else {
            breadcrumb.innerHTML = '';
        }
    }

    requestImages(perPage = 1, page = 0) {
        // hard limits set by the Pixabay API
        if (perPage < 1)
            perPage = 1;
        else if (perPage > 50)
            perPage = 50;

        if (page < 0)
            page = 0;


        // send request
        // data[page][page].map
        // this.requestJSON(url).then
        
        console.log('--------------')
        console.log(page);
        console.log(this.data.length)
        console.log(this.pageLimit);

        

        if (page >= this.data.length || page > this.pageLimit) {

            this.endOfFeed(this.endOfLine);
            
            let firstItem = this.container.lastChild;
            this.observer.unobserve(firstItem);
            this.observer.disconnect();

        } else if (this.data[page][this.filterType] == this.filter) {
            this.cardContent = this.data[page];

            this.addFeedItem(this.cardContent, this.pageLimit, this.filterType, this.filter);

            let firstCard = this.container.lastChild;

            this.observer.observe(firstCard);
        } else {
            ++this.page;
            this.requestImages(this.imagesPerRequest, this.page);
        }

    }

    endOfFeed(endText) {

        let endOfLine = endText,
            div = document.createElement("div"),
            p = document.createElement('p'),
            endOfLineText = document.createTextNode(endOfLine);
        
        p.appendChild(endOfLineText);

        this.container.appendChild(div); 
        
        div.appendChild(p);
        console.log('!! DONE !!!')

    }
    
    addFeedItem(content = {id: 0}, pageLimit, filterType, filter) {
        
            let data = {
                    id: content.id,
                    title: content.title || "Untitled",
                    author: content.author || "author",
                    tag: content.tag || "",
                    datePosted: content.datePosted || "-",
                    link: content.pageURL || "#",
                    tag: content.tag || '',
                    shortDesc: content.shortDesc || '',
                    description: content.description || '',
                },
                div = document.createElement("div"),
                headerTitle = document.createElement('h1'),
                headerLink = document.createElement('a'),
                readMoreDiv = document.createElement('p'),
                p = document.createElement('p'),
                ptag = document.createElement('span'),
                span = document.createElement('span'),
                p1 = document.createElement('p'),
                p2 = document.createElement('div'),
                tag = document.createTextNode(data.tag),
                linkText = document.createTextNode(data.title),
                author = document.createTextNode(data.author),
                datePosted = document.createTextNode(data.datePosted),
                shortDescText = document.createTextNode(data.shortDesc),
                descText = document.createTextNode(`${data.description}`),
                readMore = document.createTextNode('Quick Read');
                
            headerLink.appendChild(linkText);
            headerLink.href = data.link;
            headerLink.classList = "headerLink";
            headerTitle.appendChild(headerLink);
            headerTitle.title = data.title;
            headerTitle.classList = "headerTitle";
            


            readMoreDiv.appendChild(readMore);
            readMoreDiv.id = `read-button-${data.id}`;
            readMoreDiv.className = `read-more ${this.blockClass}-read-button`
            
            span.appendChild(author);
            span.classList = "author-span";
            p.appendChild(span);
            p.appendChild(datePosted);
            p.classList = "grey-p";
            ptag.appendChild(tag);
            ptag.classList = "grey-p p-tag";
            p1.appendChild(shortDescText);


            console.log(descText);
            console.log(`${data.description}`);
  

            div.className = `${this.blockClass}-item`;

            p2.className = `desc-animation description-collapsed-${data.id}`;
            p2.id = `description-${data.id}`;
            
            this.container.appendChild(div);
    
            div.appendChild(headerTitle);
            div.appendChild(p);
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(readMoreDiv);
            div.appendChild(ptag);
            
            document.getElementById(`description-${data.id}`).innerHTML = `${data.description}`;


            readMoreDiv.addEventListener('click', function () {
                descriptionToggle(`${data.id}`);
            }, false);

            
            headerTitle.addEventListener('click', function () {
                descriptionToggle2(data.id, pageLimit, filterType, filter);
            }, false);
            
    }

    
    getFeedItems() {
        return this.container.querySelectorAll(`.${this.blockClass}-item`);
    }


    changeConstructs(args) {
        this.container.innerHTML = '';
        this.container = document.querySelector(`#${args.id}`);
        this.blockClass = "news-feed";
        this.data = args.json;
        this.pageLimit = args.pageLimit;
        this.filter = args.filter;
        this.filterType = args.filterType;
        this.page = 1;
        this.endOfLine = args.endOfLine;
        this.breadcrumb = args.breadcrumb;

        this.requestImages(this.newsItemPerRequest);
        this.setBreadcrumb();
        
    }   

}



