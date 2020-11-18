/**
 * aVertexPosition: 버텍스 좌표 정보
 * aVertexColor: 버텍스 색상 정보
 * uMVMatrix: 모델뷰 행렬 정보
 * uPMatrix: 투영 행렬 정보
 */
export const VERTEX_SHADER_SOURCE = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying vec4 vColor;

    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vColor = aVertexColor;
        
    }
`;
/**
 * float 변수가 중간정밀도를 사용하도록 설정
 */
export const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    
    varying vec4 vColor;
    
    void main() {
        gl_FragColor = vColor;
    }
`;
