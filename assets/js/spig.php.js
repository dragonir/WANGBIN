<?php 
		if(is_home()) echo 'var isindex=true;var title="";';
		else echo 'var isindex=false;var title="',  get_the_title(),'";'; 
	?>
	<?php 
		if((($display_name = wp_get_current_user()->display_name) != null)) echo 'var visitor="',$display_name,'";'; 
		else if(isset($_COOKIE['comment_author_'.COOKIEHASH])) echo 'var visitor="',$_COOKIE['comment_author_'.COOKIEHASH],'";';
		else echo 'var visitor="游客";';echo "n"; 
?>
