export default abstract class Loader {
    protected abstract _count: number;

    abstract template: () => string;

    get count() {
        return this._count;
    }

    set count(count: number) {
        this._count = count;
    }
}
