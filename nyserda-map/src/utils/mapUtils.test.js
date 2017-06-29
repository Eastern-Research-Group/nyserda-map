import {buildLayers, filterZoomLevel} from './mapUtils';

describe('buildLayers', () => {
    function props () {
        const activeLayers = [{
            data: {
                ExistingMarsh2003: ['foo'],
                ExistingMarsh5000: ['bar'],
                NewCoastalMarsh2003: ['baz'],
            }
        }];
        const selectedLayerTypes = ['EXISTING_MARSH'];
        const selectedYear = 2003;

        return {
            activeLayers,
            selectedLayerTypes,
            selectedYear
        }
    }

    test('returns an array', () => {
        const layers = buildLayers(props());
        expect(Array.isArray(layers)).toBe(true);
    });

    test('returns the content from the selected layer types', () => {
        const layers = buildLayers(props());
        expect(layers).toEqual([['foo']]);
    });

    test('does not return content from unselected years', () => {
        const layers = buildLayers(props());
        expect(layers).not.toEqual([['bar']]);
    });

    test('does not return content from unselected layer types', () => {
        const layers = buildLayers(props());
        expect(layers).not.toEqual([['baz']]);
    });
});

describe('filterZoomLevel', () => {
    function setup () {
        const layers = [[{zoomMin: 1, zoomMax: 9}, {zoomMin: 10, zoomMax: 19}, {zoomMin: 100, zoomMax: 1000}]];
        const min = 5;
        const max = 50;

        return {
            layers,
            min,
            max
        }
    }

    test('returns an array', () => {
        const layers = filterZoomLevel([]);
        expect(Array.isArray(layers)).toBe(true);
    });

    test('takes array and returns those with zoom above the minimum level', () => {
        const {layers, min} = setup();
        const filteredLayers = filterZoomLevel(layers, {min});
        expect(filteredLayers).toEqual([[layers[0][1], layers[0][2]]]);
    });

    test('takes array and returns those with zoom below max level', () => {
        const {layers, max} = setup();
        const filteredLayers = filterZoomLevel(layers, {max});
        expect(filteredLayers).toEqual([[layers[0][0], layers[0][1]]]);
    });

    test('takes array and returns those with zoom between min and max', () => {
        const {layers, min, max} = setup();
        const filteredLayers = filterZoomLevel(layers, {min, max});
        expect(filteredLayers).toEqual([[layers[0][1]]]);
    });

    test('given no min or max, return original array', () => {
        const {layers} = setup();
        const filteredLayers = filterZoomLevel(layers);
        expect(filteredLayers).toEqual(layers);
    });

});