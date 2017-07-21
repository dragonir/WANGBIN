
/********************************************
folder name must be OutBarFolder# where # start with 1 and increase by 1
first element of array is the folder label, next elements are :
1) url for icon of item
2) label for item
3) action link : put 'javascript:MyFunction()' to execute javascript instead of hyperlink
4) target frame : ignored if you use 'javascript:' in the action link (use 'window' instead of 'parent.main' if you wish the link to load in the CURRENT page
********************************************/
/*你需要修改下面的代码，就是菜单左侧的部分，如果页面在右侧的frame打开，用parent.main，其中main是右侧的frame的名字，见下一句。由于这是例子，所以使用了javascript产生警告框，将它们去掉即可。即将下面的javascript::Run(x)全部替换成具体的页面，并且将紧接着的空的双引号中加上parent.main即可。*/
OutBarFolder1=new Array(
"我的好友",
"mail.gif","Download It","page2.htm","parent.top",
"chat.gif","Chat","page2.htm","parent.top",
"news.gif","Newsgroup","page2.htm","parent.top",
"netm.gif","Netmeeting","page2.htm","parent.top"
);
/*你可以替换相应的LOGO，这里全部的LOGO是32-32的，这个尺寸与menu.html文件中定义的一致。*/
OutBarFolder2=new Array(
"Folder 2",
"word.gif","Word","page2.htm","parent.top",
"excel.gif","Excel","page2.htm","parent.top",
"ppt.gif","Powerpoint","page2.htm","parent.top",
"access.gif","Access","page2.htm","parent.top",
"peditor.gif","Photo Editor","page2.htm","parent.top"
);
/*替换上面的javascript:Run(x)为对应的页面，并且在紧接着的双引号中加上打开的frame(parent.main)即可，注意，如果需要整个页面打开，不要使用parent.main,而要用top即可*/
OutBarFolder3=new Array(
"Folder 3",
"word.gif","Word","page2.htm","parent.top",
"ppt.gif","Powerpoint","page2.htm","parent.top"
);

OutBarFolder4=new Array(
"Folder 4",
"mail.gif","E-Mail","page2.htm","parent.top",
"chat.gif","Chat","page2.htm","parent.top",
"news.gif","Newsgroup","page2.htm","parent.top",
"netm.gif","Netmeeting","page2.htm","parent.top",
"word.gif","Word","page2.htm","parent.top",
"excel.gif","Excel","page2.htm","parent.top",
"ppt.gif","Powerpoint","page2.htm","parent.top",
"access.gif","Access","page2.htm","parent.top",
"peditor.gif","Photo Editor","page2.htm","parent.top"
);

//例子里有4个菜单按钮，可以增加，但是需要改以下outbar.js中的一些代码，要让程序知道你要处理多少个菜单。内有注释。

