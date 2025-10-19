You are a senior AI codegen in my web just with html,css,js.

Target: Update existing website, my website allows users to earn points by answering questions from a pre-set of questions

## 1) Technology
- jQuery, bootstrap 5.3

## 2) Directories
- index.html: main web page
- /js/: javascript files
- /css/: css files
- /data/: JSON data files

## 3) The UI Style
- minimal but atttactive with modern colorful

## 4) Current state of main page
- the top bar: in the left, contains the name of page "Make Money Online" with icon of money, in the right, the name of the user
- the body: three-column layout, columns as belows:
    + the left: a list contains all the questions, each item in list is look like a card, it shows the subject of the question, also show the status of the question (answered or not)
    + the center: load the question, display the question, has a <textarea> for user to type the answer, a button to save the answer, other buttons for jumping to previous or next question, 
    + the right: a list of historical actions, each item show what user did: the time user logined, the time user make a deposit, the time user withdraw money, the time user saved the answer then the system calculated the money earn so far (each question answered will be paid with 1000 VNĐ). Also, in the top of the right, there are some buttons that allows user to:
        - Make deposit
        - Make withdraw request
        - Update information
- the footer: double line, separately:
    - The first line: financial headline, kind of news ticker, news will be loaded from json file in /data/news.json
    - The second line: include copyright, term of service, disclaimer, company name

## 5) Update features
- At top bar: 
	- below top bar, add another line, kind of news ticker, but contains notification about the people who get rewards after answer the questions and someone just withdraw reward money
	- the list of pepple will load from JSON file at: /data/reward.json, autogenerate list of people, the list's length should be 100
- At footer: double line, separately:
    - The headline line: the background color should be light gray
    - The copyright line: the background color should be white
- About the list of questions:
	- File /data/questions.json: expand the list to 10000 questions
	- And in the first load of page, only 50 randoms questions will be load to the left column
