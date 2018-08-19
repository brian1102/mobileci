//
//  Theme.m
//  NewDriverYojee
//
//  Created by Hau Vo on 5/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Theme.h"
#import "ReactNativeConfig.h"

static UIColor* BRAND_COLOR;

@implementation Theme

+ (void)initialize {
    NSString *theme = [ReactNativeConfig envFor:@"THEME"];
    if ([theme isEqualToString:@"scharff"]) {
      BRAND_COLOR = [UIColor colorWithRed:(CGFloat) (255.0 / 255.0) green:(CGFloat) (113.0 / 255.0) blue:(CGFloat) (119.0 / 255.0) alpha:1];
    } else if ([theme isEqualToString:@"tasman"]) {
      BRAND_COLOR = [UIColor colorWithRed:(CGFloat) (5.0 / 255.0) green:(CGFloat) (72.0 / 255.0) blue:(CGFloat) (6.0 / 255.0) alpha:1];
    }  else if ([theme isEqualToString:@"ups"]) {
      BRAND_COLOR = [UIColor colorWithRed:(CGFloat) (48.0 / 255.0) green:(CGFloat) (21.0 / 255.0) blue:(CGFloat) (6.0 / 255.0) alpha:1];
    } else {
      BRAND_COLOR = [UIColor colorWithRed:(CGFloat) (128.0 / 255) green:(CGFloat) (201.0 / 255) blue:(CGFloat) (57 / 255) alpha:1];
    }
}

+ (UIColor*) getBrandColor {
  return BRAND_COLOR;
}

@end
