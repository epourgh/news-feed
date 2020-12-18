class Scroll extends NewsFeed {
    constructor(args) {
        super(args);
    
        const handleIntersect = (entries, self) => entries.filter(entry => entry.isIntersecting).forEach(entry => this.changeToNextEntry(entry, self));
        
        this.observer = new IntersectionObserver(handleIntersect);
        this.firstArticleRequest();
    }

    addFeedItem(content = {id: 0}, previousPageParams) {
        
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
                authorLink = document.createElement('a'),
                div2 = document.createElement('span'),
                p2 = document.createElement('div'),
                ByAuthor = document.createTextNode('By '),
                tag = document.createTextNode(data.tag),
                linkText = document.createTextNode(data.title),
                author = document.createTextNode(data.author),
                datePosted = document.createTextNode(data.datePosted),
                readMore = document.createTextNode('Quick Read');
                
            if (this.individualArticle == false) {
                headerLink.appendChild(linkText);
                headerLink.href = data.link;
                headerLink.classList = "headerLink";
                headerTitle.appendChild(headerLink);
                headerTitle.title = data.title;
                headerTitle.classList = "headerTitle";
                div.appendChild(headerTitle);
            }
            
            readMoreDiv.appendChild(readMore);
            readMoreDiv.id = `read-button-${data.id}`;
            readMoreDiv.className = `read-more ${this.blockClass}-read-button`
            
            authorLink.appendChild(author);
            authorLink.classList = "author-span";

            p.appendChild(ByAuthor);
            p.appendChild(authorLink);
            p.appendChild(datePosted);
            p.classList = "grey-p";
            ptag.appendChild(tag);
            ptag.classList = "grey-p p-tag";

            div.className = `${this.blockClass}-item`;

            div2.id = `shortDesc-${data.id}`;
            div2.className = `shortDesc`;
            p2.className = `desc-animation description-collapsed-${data.id}`;
            p2.id = `description-${data.id}`;
            
            this.container.appendChild(div);
    
            
            div.appendChild(p);
            div.appendChild(div2);
            div.appendChild(p2);
            div.appendChild(readMoreDiv);
            div.appendChild(ptag);
            
            document.getElementById(`shortDesc-${data.id}`).innerHTML = `${data.shortDesc}`;
            document.getElementById(`description-${data.id}`).innerHTML = `${data.description}`;


            readMoreDiv.addEventListener('click', function () {
                descriptionToggle(`${data.id}`);
            }, false);

            
            headerTitle.addEventListener('click', function () {
                console.log(data.id)
                descriptionToggle2(data.id, content.title, previousPageParams);
            }, false);

            authorLink.addEventListener('click', function () {
                authorToggle(data.author)
            }, false);
            
    }

    firstArticleRequest() {
        this.requestArticles();
    }

    requestArticles(page = 0) {

        if (this.didReachEndOfPage(page)) {

            this.removeObserver();
            this.setFooter(this.endOfLine);

        } else if (this.didFindSearchTerm(page)) {
            this.searchResult(page);
        } else {
            this.requestArticles(this.page++);
        }

    }

    didReachEndOfPage(page) {
        return page >= this.data.length || page > this.pageLimit;
    }

    didFindSearchTerm(page) {
        return this.data[page][this.filterType].toString().toLowerCase().indexOf(this.filter.toString().toLowerCase()) > -1;
    }

    searchResult(page) {
        this.contentProperties = this.data[page];

        const sectionTitle = document.getElementById('section-title').innerHTML;

        const previousPageParams = {
            pageLimit: this.pageLimit,
            filterType: this.filterType,
            filter: this.filter,
            endOfLine: this.endOfLine,
            sectionTitle: sectionTitle
        }

        this.addFeedItem(this.contentProperties, previousPageParams);

        let firstEntry = this.container.lastChild;

        this.observer.observe(firstEntry);
    }

    changeToNextEntry(entry, self) {
        self.unobserve(entry.target); // last entry unobserved, go to next entry
        (this.isFirstEntry)?this.isFirstEntry--:this.page++;
        console.log(this.page);
        this.requestArticles(this.page);
    }

    removeObserver() {
        this.observer.unobserve(this.container.lastChild);
        this.observer.disconnect();
    }
    
    setFooter(endText) {

        let endOfLine = endText,
            div = document.createElement("div"),
            p = document.createElement('p'),
            endOfLineText = document.createTextNode(endOfLine);

        p.appendChild(endOfLineText);

        this.container.appendChild(div);

        div.appendChild(p);

    }

}