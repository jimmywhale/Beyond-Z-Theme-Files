<?php
/**
 * The template for displaying Comments.
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() )
	return;
?>

<div id="comments" class="comments-area">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>
		<h5 class="black mb">
			<?php _e('Comments','clapat'); ?>
		</h5>

		<ol class="commentlist">
			<?php wp_list_comments( array( 'callback' => 'clapat_comment', 'style' => 'ol' ) ); ?>
		</ol><!-- .commentlist -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-below" class="navigation" role="navigation">
			<h1 class="assistive-text section-heading"><?php _e( 'Comment navigation', 'clapat' ); ?></h1>
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'clapat' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'clapat' ) ); ?></div>
		</nav>
		<?php endif; // check for comment navigation ?>

		<?php
		/* If there are no comments and comments are closed, let's leave a note.
		 * But we only want the note on posts and pages that had comments in the first place.
		 */
		if ( ! comments_open() && get_comments_number() ) : ?>
		<p class="nocomments"><?php _e( 'Comments are closed.' , 'clapat' ); ?></p>
		<?php endif; ?>

	<?php endif; // have_comments() ?>
<div class="mt">
	<?php 
	$author = (!empty($commenter['comment_author']))? esc_attr(  $commenter['comment_author'] ) : __('Name','clapat');
	$email = (!empty($commenter['comment_author_email']))? esc_attr(  $commenter['comment_author_email'] ) : __('E-mail','clapat');
	$web = (!empty($commenter['comment_author_url']))? esc_attr(  $commenter['comment_author_url'] ) : __('Website','clapat');
	$required_text = $aria_req = '';
	$req = false;
	$args = array(
	'id_form' => 'commentform',
	'id_submit' => 'submit',
	'title_reply' => __( 'Leave a comment','clapat' ),
	'title_reply_to' => __( 'Leave a comment to %s','clapat' ),
	'cancel_reply_link' => __( 'Cancel Reply','clapat' ),
	'label_submit' => __( 'Post Comment','clapat' ),
	'comment_field' => '<p class="comment-form-comment"><textarea id="comments" name="comment" onblur="if(this.value == \'\') { this.value = this.defaultValue; }" onfocus="if(this.value == this.defaultValue) { this.value = \'\'; }" rows="3" cols="40" name="comments" aria-required="true">Message</textarea></p>',
	'must_log_in' => '<p class="must-log-in">' .  sprintf( __( 'You must be <a href="%s">logged in</a> to post a comment.','clapat' ), wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>',
	'logged_in_as' => '<p class="logged-in-as">' . sprintf( __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ), admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>',
	'comment_notes_before' => '<p class="comment-notes">' . __( 'Your email address will not be published.','clapat' ) . ( $req ? $required_text : '' ) . '</p>',
	'comment_notes_after' => '<p class="form-allowed-tags">' . sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s','clapat' ), ' <code>' . allowed_tags() . '</code>' ) . '</p>',
	'fields' => apply_filters( 'comment_form_default_fields', array(
		'author' => '<input id="author" type="text" value="' . $author . '" onblur="if(this.value == \'\') { this.value = this.defaultValue; }" onfocus="if(this.value == defaultValue) { this.value = \'\'; }" size="30" name="author"' . $aria_req . '>',
		'email' => '<input id="email" type="text" value="' . $email . '" onblur="if(this.value == \'\') { this.value = this.defaultValue; }" onfocus="if(this.value == defaultValue) { this.value = \'\'; }" size="30" name="email"' . $aria_req . '>',
		'url' => '<input id="url" type="text" value="' . $web . '" onblur="if(this.value == \'\') { this.value = this.defaultValue; }" onfocus="if(this.value == defaultValue) { this.value = \'\'; }" size="30" name="url"' . $aria_req . '>',
	) ) );
	comment_form($args); ?>
</div>
</div><!-- #comments .comments-area -->