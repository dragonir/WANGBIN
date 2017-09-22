/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : TRICELL

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-06 21:11:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `g_id` int(10) NOT NULL AUTO_INCREMENT,
  `g_name` varchar(45) DEFAULT NULL,
  `g_description` text,
  `g_img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('1', '商务投资', '商务投资--商务投资--商务投资--商务投资--商务投资--商务投资', './assets/images/depart_commercia.png');
INSERT INTO `groups` VALUES ('2', '无线通信', '无线通信--无线通信--无线通信--无线通信--无线通信--无线通信', './assets/images/depart_wireless.png');
INSERT INTO `groups` VALUES ('3', '科技研究', '科技研究--科技研究--科技研究--科技研究--科技研究--科技研究', './assets/images/depart_research.png');
INSERT INTO `groups` VALUES ('4', '生物制药', '生物制药--生物制药--生物制药--生物制药--生物制药--生物制药', './assets/images/depart_madecine.png');
INSERT INTO `groups` VALUES ('5', '销售部', '销售部--销售部--销售部--销售部--销售部--销售部--销售部', './assets/images/depart_pur.png');
INSERT INTO `groups` VALUES ('6', '人事部', '人事部--人事部--人事部--人事部--人事部--人事部--人事部', './assets/images/depart_staff.png');
INSERT INTO `groups` VALUES ('7', '财务部', '财务部--财务部--财务部--财务部--财务部--财务部--财务部', './assets/images/depart_money.png');
INSERT INTO `groups` VALUES ('8', '后勤部', '后勤部--后勤部--后勤部--后勤部--后勤部--后勤部--后勤部', './assets/images/depart_manage.png');
INSERT INTO `groups` VALUES ('9', '公共区', '公共区--公共区--公共区--公共区--公共区--公共区--公共区', './assets/images/depart_public.png');

-- ----------------------------
-- Table structure for joincode
-- ----------------------------
DROP TABLE IF EXISTS `joincode`;
CREATE TABLE `joincode` (
  `j_id` int(10) NOT NULL AUTO_INCREMENT,
  `j_value` varchar(45) DEFAULT NULL,
  `j_expires` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`j_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of joincode
-- ----------------------------
INSERT INTO `joincode` VALUES ('1', '12345', '2017-06-06 14:10:47');
INSERT INTO `joincode` VALUES ('2', '12abc', '2017-06-06 14:11:01');

-- ----------------------------
-- Table structure for remark
-- ----------------------------
DROP TABLE IF EXISTS `remark`;
CREATE TABLE `remark` (
  `r_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(10) DEFAULT NULL,
  `r_description` text,
  `r_time` datetime DEFAULT NULL,
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of remark
-- ----------------------------
INSERT INTO `remark` VALUES ('1', '1', 'remark1_info', '2017-06-06 22:05:03');
INSERT INTO `remark` VALUES ('2', '2', 'remark2_info', '2017-06-06 22:05:17');
INSERT INTO `remark` VALUES ('3', '2', 'remark3_info', '2017-06-06 22:05:31');
INSERT INTO `remark` VALUES ('4', '1', 'remark4_info', '2017-06-06 22:05:40');
INSERT INTO `remark` VALUES ('5', '3', 'remark5_info', '2017-06-06 22:05:48');
INSERT INTO `remark` VALUES ('6', '3', 'remark6_info', '2017-06-06 20:57:45');
INSERT INTO `remark` VALUES ('7', '8', 'remark7_info', '2017-06-06 20:57:47');
INSERT INTO `remark` VALUES ('8', '1', 'remark8_info', '2017-06-06 20:57:50');
INSERT INTO `remark` VALUES ('9', '2', 'remark9_info', '2017-06-06 20:57:54');
INSERT INTO `remark` VALUES ('10', '3', 'remark10_info', '2017-06-06 20:57:56');
INSERT INTO `remark` VALUES ('11', '1', 'remark11', '2017-06-06 20:57:56');
INSERT INTO `remark` VALUES ('12', '1', 'remark11', '2017-06-06 20:57:56');

-- ----------------------------
-- Table structure for remarks
-- ----------------------------
DROP TABLE IF EXISTS `remarks`;
CREATE TABLE `remarks` (
  `n_id` int(10) NOT NULL AUTO_INCREMENT,
  `t_id` int(10) DEFAULT NULL,
  `r_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`n_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of remarks
-- ----------------------------
INSERT INTO `remarks` VALUES ('1', '1', '1');
INSERT INTO `remarks` VALUES ('2', '1', '3');
INSERT INTO `remarks` VALUES ('3', '1', '5');
INSERT INTO `remarks` VALUES ('4', '2', '2');
INSERT INTO `remarks` VALUES ('5', '2', '4');
INSERT INTO `remarks` VALUES ('6', '3', '6');
INSERT INTO `remarks` VALUES ('7', '4', '7');
INSERT INTO `remarks` VALUES ('12', '7', '19');
INSERT INTO `remarks` VALUES ('28', '12', '35');
INSERT INTO `remarks` VALUES ('29', '5', '36');
INSERT INTO `remarks` VALUES ('30', '7', '37');
INSERT INTO `remarks` VALUES ('31', '7', '38');
INSERT INTO `remarks` VALUES ('32', '7', '39');
INSERT INTO `remarks` VALUES ('33', '7', '40');
INSERT INTO `remarks` VALUES ('34', '7', '41');
INSERT INTO `remarks` VALUES ('35', '7', '42');
INSERT INTO `remarks` VALUES ('36', '17', '43');
INSERT INTO `remarks` VALUES ('37', '13', '44');
INSERT INTO `remarks` VALUES ('38', '13', '45');
INSERT INTO `remarks` VALUES ('39', '4', '46');
INSERT INTO `remarks` VALUES ('40', '21', '47');
INSERT INTO `remarks` VALUES ('41', '4', '48');
INSERT INTO `remarks` VALUES ('42', '5', '49');

-- ----------------------------
-- Table structure for thread
-- ----------------------------
DROP TABLE IF EXISTS `thread`;
CREATE TABLE `thread` (
  `t_id` int(10) NOT NULL AUTO_INCREMENT,
  `t_title` varchar(45) NOT NULL,
  `t_description` text,
  `t_time` datetime DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of thread
-- ----------------------------
INSERT INTO `thread` VALUES ('1', 'thread1', 'thread1_info', '2017-06-06 22:03:12');
INSERT INTO `thread` VALUES ('2', 'thread2', 'thread2_info', '2017-06-06 22:03:37');
INSERT INTO `thread` VALUES ('3', 'thread3', 'thread3_info', '2017-06-06 20:52:28');
INSERT INTO `thread` VALUES ('5', 'thread5', 'thread5_info', '2017-06-06 20:53:06');
INSERT INTO `thread` VALUES ('6', 'thread6', 'thread6_info', '2017-06-06 20:53:22');
INSERT INTO `thread` VALUES ('12', '啊分', '啊<div>等等<br>ddd</div><div><br>烦烦烦</div><div><br></div>', '2017-06-06 01:05:40');
INSERT INTO `thread` VALUES ('13', 'z', 'z', '2017-06-06 01:48:05');
INSERT INTO `thread` VALUES ('16', '哈哈', '哈格<div>N<br>用</div>', '2017-06-06 04:27:08');
INSERT INTO `thread` VALUES ('21', 'IE9', '9', '2017-06-06 08:07:49');
INSERT INTO `thread` VALUES ('22', 'z', 'z', '2017-06-06 02:29:50');
INSERT INTO `thread` VALUES ('23', 'as', '', '2017-06-06 10:28:58');
INSERT INTO `thread` VALUES ('24', 'what do you mean', '<div>#ifndef HEADFILE_H</div><div>#define HEADFILE_H</div><div>#include', '2017-06-06 11:56:16');
INSERT INTO `thread` VALUES ('25', '1223', 'sfvw', '2017-06-06 06:16:02');
INSERT INTO `thread` VALUES ('26', '1223', 'sfvw', '2017-06-06 06:16:02');
INSERT INTO `thread` VALUES ('27', '我来发第一条', '哈哈哈哈哈哈哈哈', '2017-06-06 07:59:34');
INSERT INTO `thread` VALUES ('28', '商务投资', '商务投资', '2017-06-06 08:20:28');
INSERT INTO `thread` VALUES ('29', '销售部新主题', '销售部新主题销售部新主题销售部新主题销售部新主题销售部新主题', '2017-06-06 08:32:23');
INSERT INTO `thread` VALUES ('30', '销售部新主题', '销售部新主题销售部新主题销售部新主题销售部新主题销售部新主题', '2017-06-06 08:32:25');
INSERT INTO `thread` VALUES ('31', '销售部新主题', '销售部新主题销售部新主题销售部新主题销售部新主题销售部新主题', '2017-06-06 08:32:25');
INSERT INTO `thread` VALUES ('32', '销售部新主题', '销售部新主题销售部新主题销售部新主题销售部新主题销售部新主题', '2017-06-06 08:32:26');
INSERT INTO `thread` VALUES ('33', '无线电通信', '无线电通信主题', '2017-06-06 08:42:43');

-- ----------------------------
-- Table structure for threads
-- ----------------------------
DROP TABLE IF EXISTS `threads`;
CREATE TABLE `threads` (
  `n_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(10) DEFAULT NULL,
  `t_id` int(10) DEFAULT NULL,
  `g_id` int(10) DEFAULT NULL,
  `t_state` varchar(45) DEFAULT '1',
  PRIMARY KEY (`n_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of threads
-- ----------------------------
INSERT INTO `threads` VALUES ('1', '1', '2', '9', '1');
INSERT INTO `threads` VALUES ('2', '2', '1', '3', '1');
INSERT INTO `threads` VALUES ('3', '3', '3', '9', '1');
INSERT INTO `threads` VALUES ('5', '2', '5', '9', '1');
INSERT INTO `threads` VALUES ('6', '1', '6', '9', '1');
INSERT INTO `threads` VALUES ('12', '1', '12', '3', '1');
INSERT INTO `threads` VALUES ('14', '3', '13', '9', '1');
INSERT INTO `threads` VALUES ('18', '1', '16', '3', '1');
INSERT INTO `threads` VALUES ('23', '1', '21', '9', '1');
INSERT INTO `threads` VALUES ('24', '13', '22', '9', '1');
INSERT INTO `threads` VALUES ('25', '10', '23', '9', '1');
INSERT INTO `threads` VALUES ('26', '16', '24', '9', '1');
INSERT INTO `threads` VALUES ('27', '19', '25', '9', '1');
INSERT INTO `threads` VALUES ('28', '19', '26', '9', '1');
INSERT INTO `threads` VALUES ('29', '17', '27', '9', '1');
INSERT INTO `threads` VALUES ('30', '17', '28', '1', '1');
INSERT INTO `threads` VALUES ('31', '17', '29', '1', '1');
INSERT INTO `threads` VALUES ('32', '17', '30', '1', '1');
INSERT INTO `threads` VALUES ('33', '17', '31', '1', '1');
INSERT INTO `threads` VALUES ('34', '17', '32', '1', '1');
INSERT INTO `threads` VALUES ('35', '17', '33', '1', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(45) NOT NULL,
  `u_password` varchar(45) NOT NULL,
  `u_nickname` varchar(45) NOT NULL,
  `u_sex` varchar(15) DEFAULT NULL,
  `u_age` int(10) DEFAULT NULL,
  `g_id` int(10) DEFAULT NULL,
  `u_img` varchar(45) DEFAULT NULL,
  `u_address` varchar(45) DEFAULT NULL,
  `u_description` text,
  `u_time` datetime DEFAULT NULL,
  `u_state_thread` varchar(45) DEFAULT '1',
  `u_state_user` varchar(45) DEFAULT '1',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'u1@q.c', '1', 'user1', 'male', '12', '3', './assets/imgs/static.jpg', '广东广州', '。。我是简介。', '2017-06-06 22:02:10', '1', '0');
INSERT INTO `user` VALUES ('2', 'u2@q.c', 'passw2', 'user2', 'female', '33', '4', './assets/imgs/static1.jpg', '广西桂林', '我也是简介。。。。', '2017-06-06 22:02:19', '1', '1');
INSERT INTO `user` VALUES ('3', 'u3@q.c', 'passw3', 'u3@q.c', null, null, '2', './assets/imgs/static.jpg', null, null, '2017-06-06 15:17:51', '1', '1');
INSERT INTO `user` VALUES ('7', 'u4@q.c', 'passw4', 'u4@q.c', null, null, '2', './assets/imgs/static.jpg', null, null, '2017-06-06 03:19:22', '0', '1');
INSERT INTO `user` VALUES ('8', 'u5@q.c', 'passw5', 'u5@q.c', null, null, '1', './assets/imgs/static.jpg', null, null, '2017-06-06 04:49:40', '1', '1');
INSERT INTO `user` VALUES ('9', 'u10@q.c', '10', 'u10@q.c', 'female', '13', '6', './assets/imgs/static.jpg', 'add', '', '2017-06-06 06:22:39', '1', '1');
INSERT INTO `user` VALUES ('10', 'u11@q.c', '11', 'u11@q.c', 'female', '33', '4', './assets/imgs/static.jpg', '鞍山', '', '2015-09-10 06:28:54', '1', '1');
INSERT INTO `user` VALUES ('11', 'u12@q.c', '12', 'u12@q.c', null, null, '5', './assets/imgs/static.jpg', null, null, '2017-06-06 06:35:51', '1', '1');
INSERT INTO `user` VALUES ('12', 'u13@q.c', '13', 'u13@q.c', 'female', '44', '6', './assets/imgs/static.jpg', '', '', '2017-06-06 07:59:12', '1', '1');
INSERT INTO `user` VALUES ('13', 'u111@q.c', 'a', 'u111@q.c', null, null, '5', './assets/imgs/static.jpg', null, null, '2017-06-06 02:22:20', '1', '1');
INSERT INTO `user` VALUES ('16', 'dragonir@sina.cn', 'christophe1028  ', 'dragonir@sina.cn', null, null, '1', './assets/imgs/static.jpg', null, null, '2015-09-11 11:50:48', '0', '1');
INSERT INTO `user` VALUES ('17', 'admin@qq.com', '123', 'admin', 'male', '30', '1', './assets/imgs/static.jpg', '广东', '我是admin', '2017-06-06 09:16:40', '1', '1');
INSERT INTO `user` VALUES ('18', 'user@qq.com', '123', 'user', 'male', '20', '2', './assets/imgs/static.jpg', '广西', '我是user', '2017-06-06 09:18:28', '1', '1');
INSERT INTO `user` VALUES ('19', 'wang@qq.com', '123', 'wang@qq.com', null, null, '2', './assets/imgs/static.jpg', null, null, '2017-06-06 05:31:35', '1', '1');

-- ----------------------------
-- View structure for infosthread1
-- ----------------------------
DROP VIEW IF EXISTS `infosthread1`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `infosthread1` AS select `threads`.`g_id` AS `g_id`,`threads`.`u_id` AS `u_id`,`threads`.`t_id` AS `t_id`,count(`remarks`.`r_id`) AS `remarkNums` from (`threads` left join `remarks` on((`threads`.`t_id` = `remarks`.`t_id`))) where (`threads`.`t_state` = '1') group by `threads`.`t_id` having (`threads`.`g_id` = 9) ;

-- ----------------------------
-- View structure for infosthread2
-- ----------------------------
DROP VIEW IF EXISTS `infosthread2`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `infosthread2` AS select `user`.`u_id` AS `u_id`,`user`.`u_name` AS `ut_name`,`thread`.`t_title` AS `t_title`,`thread`.`t_time` AS `t_time`,`infosthread1`.`g_id` AS `g_id`,`infosthread1`.`t_id` AS `t_id`,`infosthread1`.`remarkNums` AS `remarkNums` from ((`thread` join `infosthread1` on((`thread`.`t_id` = `infosthread1`.`t_id`))) join `user` on((`user`.`u_id` = `infosthread1`.`u_id`))) where ((`user`.`u_state_thread` = '1') and (`user`.`u_state_user` = '1')) order by `thread`.`t_time` desc limit 5 ;

-- ----------------------------
-- View structure for infos_group1
-- ----------------------------
DROP VIEW IF EXISTS `infos_group1`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `infos_group1` AS select `groups`.`g_img` AS `g_img`,`groups`.`g_id` AS `g_id`,count(`user`.`u_id`) AS `pNum` from (`groups` left join `user` on((`user`.`g_id` = `groups`.`g_id`))) group by `groups`.`g_id` ;

-- ----------------------------
-- View structure for infos_group2
-- ----------------------------
DROP VIEW IF EXISTS `infos_group2`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `infos_group2` AS select max(`thread`.`t_time`) AS `tTime`,`threads`.`t_id` AS `t_id`,`groups`.`g_id` AS `g_id`,`groups`.`g_name` AS `g_name`,count(`threads`.`t_id`) AS `tNum` from ((`groups` left join `threads` on((`threads`.`g_id` = `groups`.`g_id`))) left join `thread` on((`threads`.`t_id` = `thread`.`t_id`))) group by `groups`.`g_id` ;

-- ----------------------------
-- View structure for re1
-- ----------------------------
DROP VIEW IF EXISTS `re1`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `re1` AS select `groups`.`g_img` AS `g_img`,`groups`.`g_id` AS `g_id`,count(`user`.`u_id`) AS `pNum` from (`groups` left join `user` on((`user`.`g_id` = `groups`.`g_id`))) group by `groups`.`g_id` ;

-- ----------------------------
-- View structure for re2
-- ----------------------------
DROP VIEW IF EXISTS `re2`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `re2` AS select max(`thread`.`t_time`) AS `max(thread.t_time)`,`threads`.`t_id` AS `t_id`,`groups`.`g_id` AS `g_id`,count(`threads`.`t_id`) AS `tNum` from ((`groups` left join `threads` on((`threads`.`g_id` = `groups`.`g_id`))) left join `thread` on((`threads`.`t_id` = `thread`.`t_id`))) group by `groups`.`g_id` ;

-- ----------------------------
-- View structure for re3
-- ----------------------------
DROP VIEW IF EXISTS `re3`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `re3` AS select `re1`.`g_img` AS `g_img`,`re1`.`pNum` AS `pNum`,`re2`.`tNum` AS `tNum` from (`re1` join `re2` on((`re1`.`g_id` = `re2`.`g_id`))) ;
