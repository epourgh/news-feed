## Serve Locally with Python 3:
```git
python3 -m http.server
```

## Converting Emmet HTML to String

### Input:
```javascript
let string = 
`
<ul class="adjust-ul">
    <li>
        <p><b>term:</b> sample content inserted here</p>
        <p><b>term:</b> sample content inserted here</p>
    </li>
    <li>
        <p><b>term:</b> sample content inserted here</p>
        <p><b>term:</b> sample content inserted here</p>
    </li>
</ul>
`;

convertToJSON = (string) => {
  let newstring = string.split('\n').join('') // remove breaks
                        .replace(/\>\s+\</g,'><') // remove indents
                        .replace(/\"/g,'\'') // replace double quotes to single

  console.log(newstring)
} 

convertToJSON(string);
```

### Output:
```javascript
"<ul class='adjust-ul'><li><p><b>term:</b> sample content inserted here</p><p><b>term:</b> sample content inserted here</p></li><li><p><b>term:</b> sample content inserted here</p><p><b>term:</b> sample content inserted here</p></li></ul>"
```