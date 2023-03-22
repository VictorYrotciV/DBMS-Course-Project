/*
 Navicat Premium Data Transfer

 Source Server         : Local instance MySQL80
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : library

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 27/05/2022 10:53:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for 借阅记录
-- ----------------------------
DROP TABLE IF EXISTS `借阅记录`;
CREATE TABLE `借阅记录`  (
  `编号` int NOT NULL,
  `证件号码` int NOT NULL,
  `借阅时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `归还期限` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `归还时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`编号`, `证件号码`, `借阅时间`) USING BTREE,
  INDEX `FK_借阅产生`(`证件号码`) USING BTREE,
  CONSTRAINT `FK_借阅产生` FOREIGN KEY (`证件号码`) REFERENCES `读者` (`证件号码`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_借阅图书` FOREIGN KEY (`编号`) REFERENCES `图书` (`编号`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 图书
-- ----------------------------
DROP TABLE IF EXISTS `图书`;
CREATE TABLE `图书`  (
  `编号` int NOT NULL,
  `工号` int NOT NULL,
  `书名` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `作者` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `出版商` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `地址` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `状态` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '_utf8mb4\\\'å¯å¤å\\\'',
  `类别` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`编号`) USING BTREE,
  INDEX `FK_编录`(`工号`) USING BTREE,
  CONSTRAINT `FK_编录` FOREIGN KEY (`工号`) REFERENCES `图书馆管理人员` (`工号`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 图书馆管理人员
-- ----------------------------
DROP TABLE IF EXISTS `图书馆管理人员`;
CREATE TABLE `图书馆管理人员`  (
  `工号` int NOT NULL,
  `姓名` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `密码` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Nku123456',
  PRIMARY KEY (`工号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 座位
-- ----------------------------
DROP TABLE IF EXISTS `座位`;
CREATE TABLE `座位`  (
  `座位号` int NOT NULL,
  `位置` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`座位号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 校内人员
-- ----------------------------
DROP TABLE IF EXISTS `校内人员`;
CREATE TABLE `校内人员`  (
  `证件号码` int NOT NULL,
  `部门名称` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`证件号码`) USING BTREE,
  CONSTRAINT `FK_属于` FOREIGN KEY (`证件号码`) REFERENCES `读者` (`证件号码`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 校外人员
-- ----------------------------
DROP TABLE IF EXISTS `校外人员`;
CREATE TABLE `校外人员`  (
  `证件号码` int NOT NULL,
  `来访单位` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`证件号码`) USING BTREE,
  CONSTRAINT `FK_属于2` FOREIGN KEY (`证件号码`) REFERENCES `读者` (`证件号码`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 读者
-- ----------------------------
DROP TABLE IF EXISTS `读者`;
CREATE TABLE `读者`  (
  `证件号码` int NOT NULL,
  `姓名` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `信用分` int NOT NULL,
  `密码` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Nku123456',
  PRIMARY KEY (`证件号码`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 违规原因表
-- ----------------------------
DROP TABLE IF EXISTS `违规原因表`;
CREATE TABLE `违规原因表`  (
  `reason` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`reason`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 违规记录
-- ----------------------------
DROP TABLE IF EXISTS `违规记录`;
CREATE TABLE `违规记录`  (
  `证件号码` int NOT NULL,
  `违规原因` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `违规时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `是否生效` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '_utf8mb4\\\'true\\\'',
  PRIMARY KEY (`证件号码`, `违规原因`, `违规时间`) USING BTREE,
  CONSTRAINT `FK_拥有` FOREIGN KEY (`证件号码`) REFERENCES `读者` (`证件号码`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 预约记录
-- ----------------------------
DROP TABLE IF EXISTS `预约记录`;
CREATE TABLE `预约记录`  (
  `证件号码` int NOT NULL,
  `座位号` int NOT NULL,
  `起始时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `离开期限` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `入馆时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `离开时间` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`证件号码`, `座位号`, `起始时间`) USING BTREE,
  INDEX `FK_预约产生`(`座位号`) USING BTREE,
  CONSTRAINT `FK_预约产生` FOREIGN KEY (`座位号`) REFERENCES `座位` (`座位号`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_预约操作` FOREIGN KEY (`证件号码`) REFERENCES `读者` (`证件号码`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for popular_books
-- ----------------------------
DROP VIEW IF EXISTS `popular_books`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `popular_books` AS select `图书`.`书名` AS `bookname`,`图书`.`作者` AS `author`,`图书`.`出版商` AS `publisher`,`图书`.`类别` AS `class`,count(0) AS `times` from (`图书` join `借阅记录` on((`图书`.`编号` = `借阅记录`.`编号`))) group by `图书`.`书名`,`图书`.`作者`,`图书`.`出版商` order by `times` desc;

-- ----------------------------
-- Procedure structure for del_vio
-- ----------------------------
DROP PROCEDURE IF EXISTS `del_vio`;
delimiter ;;
CREATE PROCEDURE `del_vio`(inid int,
	inreas char(255),
	intime char(255),
	OUT res int)
begin
	set @newscore = 0;
   if exists(select * from 违规记录 where 证件号码=inid  and 违规时间=intime and 违规原因=inreas and 是否生效='true') then 
			update 违规记录 set 是否生效='false' where 证件号码=inid  and 违规时间=intime and 违规原因=inreas;
			select @newscore:=信用分 from 读者 where 证件号码=inid;
			set @newscore = @newscore+10;
			if @newscore>100 THEN
				SET @newscore = 100;
			end if;
			update 读者 set 信用分=@newscore where 证件号码=inid;
			SET res = 1;
		ELSE
			SET res=2;
		end if;
	end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table 图书
-- ----------------------------
DROP TRIGGER IF EXISTS `getbookid`;
delimiter ;;
CREATE TRIGGER `getbookid` BEFORE INSERT ON `图书` FOR EACH ROW begin
declare newbookid int;
set newbookid = (select count(*) from 图书) + 1;
set new.编号 = newbookid;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table 违规记录
-- ----------------------------
DROP TRIGGER IF EXISTS `score_sub`;
delimiter ;;
CREATE TRIGGER `score_sub` AFTER INSERT ON `违规记录` FOR EACH ROW begin
declare c int;
set c = (select 信用分 from 读者 where 证件号码=new.证件号码);
update 读者 set 信用分 = c - 10 where 证件号码 = new.证件号码;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table 违规记录
-- ----------------------------
DROP TRIGGER IF EXISTS `limited_reason`;
delimiter ;;
CREATE TRIGGER `limited_reason` BEFORE INSERT ON `违规记录` FOR EACH ROW begin
if new.违规原因 not in(SELECT reason FROM `违规原因表`) then  
INSERT INTO 违规记录 (证件号码, 违规原因, 违规时间) VALUES(new.证件号码,new.违规原因,new.违规时间);
end if;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
