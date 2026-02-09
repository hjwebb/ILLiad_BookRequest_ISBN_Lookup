# ILLiad_BookRequest_ISBN_Lookup
Code to search and fill the Book Request form for the ILLiad webpages that uses the Google Books API. It fills out the citation information. It also checks for any indication that the ISBN might be an ebook and displays a message.

## Directions
- Add the book_lookup.js to your js folder.
- Adjust your LoanRequest.html page.
- Adjust any css.

### LoanRequest.html Changes
In the <head> section, add the following call to the script.
```
<script type="text/javascript" src="js/book_lookup.js" ></script>
```
Adjust your ISSN field by moving it to the top of your book request section and using similiar code to the following:
```
						<div class="form-group col-md-9">
							<label for="ISSN">
								<span class="field">
									<span class="<#ERROR name='ERRORISSN'>">
										ISBN (International Standard Book Number)
										<div class="tooltip">
										<span aria-hidden="true" class="fas fa-info-circle mr-1"></span><span class="tooltiptext">This ISBN resolver will search the Google API and complete the citation information on this book request form. If you have already imported the citation from a database or Primo search, there is no need to look up the citation again. </span>
										</div>
									</span>
								</span>
							</label>
							<input type="text" class="form-control" name="ISSN" id="ISSN" value="<#PARAM name='ISSN'>">
							
						<button type="button" id="isbnSearchBtn" class="btn btn-primary btn-md c-doi">Lookup Citation Information by ISBN</button>
						<div id="isbnError"> </div>
						<div id="ebookmessage"></div> 
						</div>
```

### CSS Suggestions
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

