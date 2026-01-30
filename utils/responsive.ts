import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design dimensions (standard mobile frame, e.g., iPhone 11/12/13/14 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Converts a percentage of screen width to generic numeric value.
 * @param percentage The percentage of the screen width (e.g., 50 for 50%)
 * @returns The calculated width in pixels
 */
export const wp = (percentage: number): number => {
    const value = (percentage * SCREEN_WIDTH) / 100;
    return Math.round(value);
};

/**
 * Converts a percentage of screen height to generic numeric value.
 * @param percentage The percentage of the screen height (e.g., 50 for 50%)
 * @returns The calculated height in pixels
 */
export const hp = (percentage: number): number => {
    const value = (percentage * SCREEN_HEIGHT) / 100;
    return Math.round(value);
};

/**
 * Scales a size directly based on the screen width relative to base design width.
 * Useful for ensuring elements stay proportional.
 * @param size The size in pixels from the design
 * @returns The resized size in pixels
 */
export const wpDirect = (size: number): number => {
    return Math.round((size / BASE_WIDTH) * SCREEN_WIDTH);
};

/**
 * Responsive Font Size
 * Scales font size based on screen width, with a clamp to prevent massive text on tablets if desired.
 * @param size Standard font size (e.g., 16)
 * @returns Scaled font size
 */
export const rf = (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/**
 * Device helpers
 */
export const device = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    isSmallDevice: SCREEN_WIDTH < 375,
    isLargeDevice: SCREEN_WIDTH > 428,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    statusBarHeight: StatusBar.currentHeight || 0,
};
