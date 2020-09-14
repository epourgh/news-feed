class NewsFeed {
    constructor(args) {
        this.container = document.querySelector(`#${args.id}`);
        this.blockClass = "news-feed";
        this.cardContent = null;
        this.status = null;
        this.page = 1;
        this.newsItemPerRequest = 1;
        this.data = args.json;
        this.filterType = args.filterType
        this.filter = args.filter;
        this.endOfLine = args.endOfLine;
        
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
                            this.addFeedItem(this.cardContent[contentIndex]);
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
        this.requestImages(this.newsItemPerRequest);
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

        

        if (page >= this.data.length) {

            this.endOfFeed(this.endOfLine);
            
            let firstItem = this.container.lastChild;
            this.observer.unobserve(firstItem);
            this.observer.disconnect();

        } else if (this.data[page][this.filterType] == this.filter) {
            this.cardContent = this.data[page];

            this.addFeedItem(this.cardContent);

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
    
    addFeedItem(content = {id: 0}) {
        
            let data = {
                    id: content.id,
                    title: content.title || "Untitled",
                    link: content.pageURL || "#",
                    tag: content.tag || '',
                    shortDesc: content.shortDesc || '',
                    description: content.description || '',
                },
                div = document.createElement("div"),
                headerTitle = document.createElement('a'),
                readMoreDiv = document.createElement('p'),
                p1 = document.createElement('p'),
                p2 = document.createElement('div'),
                linkText = document.createTextNode(data.title),
                shortDescText = document.createTextNode(data.shortDesc),
                descText = document.createTextNode(`${data.description}`),
                readMore = document.createTextNode('Quick Read');
                
            headerTitle.appendChild(linkText);
            headerTitle.title = data.title;
            headerTitle.href = data.link;

            readMoreDiv.appendChild(readMore);
            readMoreDiv.id = `read-button-${data.id}`;
            readMoreDiv.className = `${this.blockClass}-read-button`
            
            p1.appendChild(shortDescText);

            console.log(descText);
            console.log(`${data.description}`);
  

            div.className = `${this.blockClass}-item`;

            p2.className = `desc-animation description-collapsed-${data.id}`;
            p2.id = `description-${data.id}`;
            
            this.container.appendChild(div);
    
            div.appendChild(headerTitle);
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(readMoreDiv);
            
            document.getElementById(`description-${data.id}`).innerHTML = `${data.description}`;


            readMoreDiv.addEventListener('click', function () {
                descriptionToggle(`${data.id}`);
            }, false);

            headerTitle.addEventListener('click', function () {
                descriptionToggle2(`${data.id}`);
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
        this.filter = args.filter;
        this.filterType = args.filterType;
        this.page = 1;
        this.endOfLine = args.endOfLine;

        this.requestImages(this.newsItemPerRequest);
        console.log(this.data);
    }   

}

(async () => {
    
    let response = await fetch('./index.json');
    let jsonData = await response.json();
    
    const newsFeed = new NewsFeed({
        id: "news-section",
        json: jsonData.data,
        filter: "ALL",
        filterType: "secondTag",
        endOfLine: "You have scrolled to the bottom of the feed.",
    });
    
    document.getElementById("button").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            filter: "somethingelse",
            filterType: "tag",
            endOfLine: "You have scrolled to the bottom of the feed.",
        });
    });
    
    document.getElementById("button2").addEventListener("click", () => {
        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            filter: "ALL",
            filterType: "secondTag",
            endOfLine: "You have scrolled to the bottom of the feed.",
        });
    });

    descriptionToggle = (dataId) => {
        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? 'Collapse Quick Read' : 'Quick Read';
    }


    descriptionToggle2 = (dataId) => {

        console.log(jsonData.data);

        newsFeed.changeConstructs({
            id: "news-section",
            json: jsonData.data,
            filter: dataId,
            filterType: "id",
            endOfLine: " ",
        });

        let display = document.getElementById(`description-${dataId}`);
        let button = document.getElementById(`read-button-${dataId}`);
        const expandOrCollapsed = display.className == `desc-animation description-collapsed-${dataId}` ? "expand" : "collapsed";

        display.className = `desc-animation description-${expandOrCollapsed}-${dataId}`;
        button.innerHTML = expandOrCollapsed == 'expand' ? '' : 'Quick Read';
    }

    
})();




