# ILLiad_BookRequest_ISBN_Lookup
Code to search and fill the Book Request form for the ILLiad webpages that uses the Google Books API. It fills out the citation information. It also checks for any indication that the ISBN might be an ebook and displays a message.

##CSS Suggestions
The following are some css changes we have that are relevant to the ISBN lookup.
```
/* loan isbn adjustments */
input#ISSN {
    width: 50%;
    display: unset;
}

button#isbnSearchBtn {
    display: unset;
	margin: 2px 0;
}

div#isbnError {
    padding-top: 5px;
    padding-left: 20px;
    color: #b81f18;
    font-weight: bold;
}

div#ebookmessage {
    padding-top: 5px;
    padding-left: 20px;
    color: #b81f18;
    font-weight: bold;
}
/* tooltip hover over i symbol */

.tooltip {
  position: relative;
  display: inline-block;
  opacity: unset;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 350px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}

.tooltiptext {
  visibility: hidden;
  width: 350px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

```

