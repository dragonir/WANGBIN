
/********************************************
folder name must be OutBarFolder# where # start with 1 and increase by 1
first element of array is the folder label, next elements are :
1) url for icon of item
2) label for item
3) action link : put 'javascript:MyFunction()' to execute javascript instead of hyperlink
4) target frame : ignored if you use 'javascript:' in the action link (use 'window' instead of 'parent.main' if you wish the link to load in the CURRENT page
********************************************/
/*����Ҫ�޸�����Ĵ��룬���ǲ˵����Ĳ��֣����ҳ�����Ҳ��frame�򿪣���parent.main������main���Ҳ��frame�����֣�����һ�䡣�����������ӣ�����ʹ����javascript��������򣬽�����ȥ�����ɡ����������javascript::Run(x)ȫ���滻�ɾ����ҳ�棬���ҽ������ŵĿյ�˫�����м���parent.main���ɡ�*/
OutBarFolder1=new Array(
"�ҵĺ���",
"mail.gif","Download It","page2.htm","parent.top",
"chat.gif","Chat","page2.htm","parent.top",
"news.gif","Newsgroup","page2.htm","parent.top",
"netm.gif","Netmeeting","page2.htm","parent.top"
);
/*������滻��Ӧ��LOGO������ȫ����LOGO��32-32�ģ�����ߴ���menu.html�ļ��ж����һ�¡�*/
OutBarFolder2=new Array(
"Folder 2",
"word.gif","Word","page2.htm","parent.top",
"excel.gif","Excel","page2.htm","parent.top",
"ppt.gif","Powerpoint","page2.htm","parent.top",
"access.gif","Access","page2.htm","parent.top",
"peditor.gif","Photo Editor","page2.htm","parent.top"
);
/*�滻�����javascript:Run(x)Ϊ��Ӧ��ҳ�棬�����ڽ����ŵ�˫�����м��ϴ򿪵�frame(parent.main)���ɣ�ע�⣬�����Ҫ����ҳ��򿪣���Ҫʹ��parent.main,��Ҫ��top����*/
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

//��������4���˵���ť���������ӣ�������Ҫ������outbar.js�е�һЩ���룬Ҫ�ó���֪����Ҫ������ٸ��˵�������ע�͡�

