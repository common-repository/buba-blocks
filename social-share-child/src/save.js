// Import block dependencies and components


/**
 * WordPress dependencies
 */
import {useBlockProps,} from '@wordpress/block-editor';

import classnames from 'classnames';
import socialLinks from "../../assets/socialLinks";


export default function Save({attributes}) {
    const {
        icon,
        typeIcon,
        typeShareLink,
        iconColor,
        iconBackground,
        customLink,
        mediaId,
        mediaUrl,
        iconSize,
        iconBorderRadius,
        iconGap,
        isSimilarWidth,
        iconWidth
    } = attributes;

    const shareLinks = {
        facebook: "https://www.facebook.com/sharer.php?u=",
        twitter: "https://twitter.com/share?url=",
        google: "https://plus.google.com/share?url=",
        linkedin: "https://www.linkedin.com/shareArticle?url=",
        digg: "http://digg.com/submit?url=",
        blogger: "https://www.blogger.com/blog_this.pyra?t&amp;u=",
        reddit: "https://reddit.com/submit?url=",
        stumbleupon: "https://www.stumbleupon.com/submit?url=",
        tumblr: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=",
        myspace: "https://myspace.com/post?u=",
        email: "mailto:?body=",
        pinterest: "https://pinterest.com/pin/create/link/?url=",
        vk: 'https://vkontakte.ru/share.php?url=',
        odnoklassniki: 'https://connect.ok.ru/offer?url=',
        pocket: 'https://getpocket.com/edit?url=',
        whatsapp: 'https://api.whatsapp.com/send?text=', // whatsapp://send?text=*{title}*\n{text}\n{url}',//https://api.whatsapp.com/send?text=textToshare
        xing: 'https://www.xing.com/app/user?op=share&url=',
        telegram: 'https://telegram.me/share/url?url=',
        skype: 'https://web.skype.com/share?url=',
        buffer: 'https://buffer.com/add?url='
    };

    const classes = classnames('buba-social-share', {});

    const styleLi = {
        marginRight: iconGap ? iconGap + 'px' : undefined
    }
    const classNameLink = classnames('buba-social-share__item-link', {
        'buba-is-image-icon': typeIcon === 'image',
        'buba-is-icon': typeIcon === 'icon',
    });
    const styles = {
        backgroundColor: iconBackground ? iconBackground : undefined,
        color: iconColor ? iconColor : undefined,
        borderRadius: iconBorderRadius ? iconBorderRadius + 'px' : undefined,
        width: isSimilarWidth ? 'calc('+iconSize+'px * var(--global--line-height-body))' : iconWidth + 'px',
        fontSize: iconSize ?? iconSize + 'px'
    }


    return (
        <li {...useBlockProps.save({
            className: classes,
            style: styleLi
        })}>
            <a href={shareLinks[typeShareLink]+customLink}
               className={classNameLink}
               style={styles}
            > 
                {typeIcon === 'icon' && (
                    <i
                        data-icomoon={String.fromCodePoint(
                            icon
                        )}
                    />
                )}
                {typeIcon === 'image' && mediaUrl && (
                    <img src={mediaUrl} alt={typeShareLink}/>
                )}
            </a>
        </li>

    );
}
