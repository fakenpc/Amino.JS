/**
 * A File for sorting Enpointresponses
 * @module Amino.JS_Sorter
 * @author RobStyling
 * @version 0.1
 * @beta
 */

module.exports = {
    threadSort: (element) => {
        let joined;
        let publicChat;
        let group;
        let muted;
        let unread;
        if (element.type == 2) publicChat = true;
        else publicChat = false;
        if (element.type == 1 || element.type == 2) group = true;
        else group = false;
        if (element.membershipStatus == 1) joined = true;
        else joined = false;
        if (element.alertOption == 1) muted = true;
        else muted = false;
        if (element.condition == 1) unread = true;
        else unread = false;
        return {
            'threadId': element.threadId,
            'memberCount': element.membersCount,
            'title': element.title,
            'joined': joined,
            'public': publicChat,
            'group': group,
            'muted': muted,
            'unread': unread,
            'lastMessage': {
                'senderId': element.lastMessageSummary.uid,
                'message': element.lastMessageSummary.content
            },
            'members': element.membersSummary
        };
    },

    comSort: (element) => {
        return {
            'id': 'x' + element.ndcId,
            'name': element.name,
            'link': element.link,
            'icon': element.icon,
            'tagline': element.tagline,
            'createdTime': element.createdTime
        };
    },

    sendMessageSorter: (uid, element) => {
        return {
            'threadId': uid,
            'messageId': element.messageId,
            'msg': element.content,
            'type': element.type,
            'author': {
                'uid': element.author.uid,
                'name': element.author.name,
                'level': element.author.level,
                'role': element.author.role
            }
        };
    },

    blogsSorter: (element) => {
        return {
            'blogId': element.blogId,
            'title': element.title,
            'content': element.content,
            'referedObject': element.refObject,
            'keywords': element.keywords,
            'createdTime': element.createdTime,
            'likeCount': element.votesCount,
            'commentsCount': element.commentsCount,
            'liked': ((element.votedValue == 4) ? 1 : 0),
            'author': element.author
        };
    },

    commentSorter: (element) => {
        return {
            'commentId': element.commentId,
            'content': element.content,
            'media': element.mediaList,
            'createdTime': element.createdTime,
            'likeCount': element.votesSum,
            'blogId': element.parentId,
            'subcomments':element.subcomments,
            'author': element.author
        };
    },
    sortWiki: (itemObj, itemElem) => {
        itemObj.item.itemid = itemElem.itemId;
        itemObj.item.createdTime = itemElem.createdTime;
        itemObj.item.title = itemElem.label;
        itemObj.item.content = itemElem.content;
        itemObj.item.author.uid = itemElem.author.uid;
        itemObj.item.author.username = itemElem.author.nickname;
        itemObj.item.author.icon = itemElem.author.icon;
        itemObj.item.author.role = itemElem.author.role;
        itemObj.item.author.level = itemElem.author.level;
        itemObj.item.mediaList = itemElem.mediaList;
        itemObj.item.likeCount = itemElem.votesCount;
        itemObj.item.commentCount = itemElem.commentsCount;
        return itemObj;
    },

    userSorter: (element) => {
        return {
            'uid': element.uid,
            'nickname': element.nickname,
            'address': element.address,
            'latitude': element.latitude,
            'longitude': element.longitude,
            'level': element.level,
            'createdTime': element.createdTime,
            'modifiedTime': element.modifiedTime,
            'blogsCount': element.blogsCount,
            'membershipStatus': element.membershipStatus,
            'onlineStatus': element.onlineStatus
        };
    },
};

    