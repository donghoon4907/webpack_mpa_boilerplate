declare module "*.png";

declare module "*.pug";

declare module "*.mp3";

declare module "webgl-debug" {
    interface GLCanvasElement extends HTMLCanvasElement {
        loseContextInNCalls(nCalls: number): void;
        setRestoreTimeout(timeout: number): void;
    }

    /**
     * Use as >>> import WebGLDebugUtil from "webgl-debug";
     * @see https://www.khronos.org/webgl/wiki/Debugging
     * @see https://www.khronos.org/webgl/wiki/HandlingContextLost
     */
    namespace WebGLDebugUtil {
        function makeDebugContext(gl: WebGLRenderingContext | null, ...args: any): WebGLRenderingContext | undefined;
        function glFunctionArgsToString(name: any, args: any): void;
        function makeLostContextSimulatingCanvas(canvas: HTMLCanvasElement): GLCanvasElement;
    }

    export default WebGLDebugUtil;
}
