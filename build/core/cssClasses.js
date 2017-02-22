'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtendClassesMap = exports.getComposesClassesMap = exports.getRegularClassesMap = undefined;

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRegularClassesMap = exports.getRegularClassesMap = function getRegularClassesMap(ast) {
  var ruleSets = [];
  ast.traverseByType('ruleset', function (node) {
    return ruleSets.push(node);
  });

  return _fp2.default.compose(_fp2.default.reduce(function (result, key) {
    result[key] = false; // classes haven't been used
    return result;
  }, {}), _fp2.default.map('content'), _fp2.default.filter({ type: 'ident' }), _fp2.default.flatMap('content'), _fp2.default.filter({ type: 'class' }), _fp2.default.flatMap('content'), _fp2.default.filter({ type: 'selector' }), _fp2.default.flatMap('content'))(ruleSets);
};
var getComposesClassesMap = exports.getComposesClassesMap = function getComposesClassesMap(ast) {
  var declarations = [];
  ast.traverseByType('declaration', function (node) {
    return declarations.push(node);
  });

  return _fp2.default.compose(_fp2.default.reduce(function (result, key) {
    result[key] = true; // mark composed classes as true
    return result;
  }, {}), _fp2.default.flatMap(_fp2.default.compose(_fp2.default.get('content'), _fp2.default.find({ type: 'ident' }), _fp2.default.get('content'), _fp2.default.find({ type: 'class' }), _fp2.default.get('content'), _fp2.default.find({ type: 'value' }), _fp2.default.get('content'))),
  /*
     reject classes composing from other files
     eg.
     .foo {
     composes: .bar from './otherFile';
     }
   */
  _fp2.default.reject(_fp2.default.compose(_fp2.default.find({ type: 'ident', content: 'from' }), _fp2.default.get('content'), _fp2.default.find({ type: 'value' }), _fp2.default.get('content'))), _fp2.default.filter(_fp2.default.compose(_fp2.default.find({ type: 'ident', content: 'composes' }), _fp2.default.get('content'), _fp2.default.find({ type: 'property' }), _fp2.default.get('content'))))(declarations);
};

var getExtendClassesMap = exports.getExtendClassesMap = function getExtendClassesMap(ast) {
  var extendNodes = [];
  ast.traverseByType('extend', function (node) {
    return extendNodes.push(node);
  });

  return _fp2.default.compose(_fp2.default.reduce(function (result, key) {
    result[key] = true; // mark extend classes as true
    return result;
  }, {}), _fp2.default.map(_fp2.default.compose(_fp2.default.get('content'), _fp2.default.find({ type: 'ident' }), _fp2.default.get('content'), _fp2.default.find({ type: 'class' }), _fp2.default.get('content'), _fp2.default.find({ type: 'selector' }), _fp2.default.get('content'))))(extendNodes);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL2Nzc0NsYXNzZXMuanMiXSwibmFtZXMiOlsiZ2V0UmVndWxhckNsYXNzZXNNYXAiLCJhc3QiLCJydWxlU2V0cyIsInRyYXZlcnNlQnlUeXBlIiwicHVzaCIsIm5vZGUiLCJjb21wb3NlIiwicmVkdWNlIiwicmVzdWx0Iiwia2V5IiwibWFwIiwiZmlsdGVyIiwidHlwZSIsImZsYXRNYXAiLCJnZXRDb21wb3Nlc0NsYXNzZXNNYXAiLCJkZWNsYXJhdGlvbnMiLCJnZXQiLCJmaW5kIiwicmVqZWN0IiwiY29udGVudCIsImdldEV4dGVuZENsYXNzZXNNYXAiLCJleHRlbmROb2RlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7QUFRTyxJQUFNQSxzREFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxHQUFELEVBQWlDO0FBQ25FLE1BQU1DLFdBQTRCLEVBQWxDO0FBQ0FELE1BQUlFLGNBQUosQ0FBbUIsU0FBbkIsRUFBOEI7QUFBQSxXQUFRRCxTQUFTRSxJQUFULENBQWNDLElBQWQsQ0FBUjtBQUFBLEdBQTlCOztBQUVBLFNBQU8sYUFBR0MsT0FBSCxDQUNMLGFBQUdDLE1BQUgsQ0FBVSxVQUFDQyxNQUFELEVBQVNDLEdBQVQsRUFBaUI7QUFDekJELFdBQU9DLEdBQVAsSUFBYyxLQUFkLENBRHlCLENBQ0o7QUFDckIsV0FBT0QsTUFBUDtBQUNELEdBSEQsRUFHRyxFQUhILENBREssRUFLTCxhQUFHRSxHQUFILENBQU8sU0FBUCxDQUxLLEVBTUwsYUFBR0MsTUFBSCxDQUFVLEVBQUVDLE1BQU0sT0FBUixFQUFWLENBTkssRUFPTCxhQUFHQyxPQUFILENBQVcsU0FBWCxDQVBLLEVBUUwsYUFBR0YsTUFBSCxDQUFVLEVBQUVDLE1BQU0sT0FBUixFQUFWLENBUkssRUFTTCxhQUFHQyxPQUFILENBQVcsU0FBWCxDQVRLLEVBVUwsYUFBR0YsTUFBSCxDQUFVLEVBQUVDLE1BQU0sVUFBUixFQUFWLENBVkssRUFXTCxhQUFHQyxPQUFILENB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c3Nlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZnAgZnJvbSAnbG9kYXNoL2ZwJztcblxuaW1wb3J0IHR5cGUgeyBnQVNUTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcblxudHlwZSBjbGFzc01hcFR5cGUgPSB7XG4gIFtrZXk6IHN0cmluZ106IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjb25zdCBnZXRSZWd1bGFyQ2xhc3Nlc01hcCA9IChhc3Q6IGdBU1ROb2RlKTogY2xhc3NNYXBUeXBlID0+IHtcbiAgY29uc3QgcnVsZVNldHM6IEFycmF5PGdBU1ROb2RlPiA9IFtdO1xuICBhc3QudHJhdmVyc2VCeVR5cGUoJ3J1bGVzZXQnLCBub2RlID0+IHJ1bGVTZXRzLnB1c2gobm9kZSkpO1xuXG4gIHJldHVybiBmcC5jb21wb3NlKFxuICAgIGZwLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gZmFsc2U7IC8vIGNsYXNzZXMgaGF2ZW4ndCBiZWVuIHVzZWRcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pLFxuICAgIGZwLm1hcCgnY29udGVudCcpLFxuICAgIGZwLmZpbHRlcih7IHR5cGU6ICdpZGVudCcgfSksXG4gICAgZnAuZmxhdE1hcCgnY29udGVudCcpLFxuICAgIGZwLmZpbHRlcih7IHR5cGU6ICdjbGFzcycgfSksXG4gICAgZnAuZmxhdE1hcCgnY29udGVudCcpLFxuICAgIGZwLmZpbHRlcih7IHR5cGU6ICdzZWxlY3RvcicgfSksXG4gICAgZnAuZmxhdE1hcCgnY29udGVudCcpLFxuICApKHJ1bGVTZXRzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDb21wb3Nlc0NsYXNzZXNNYXAgPSAoYXN0OiBnQVNUTm9kZSk6IGNsYXNzTWFwVHlwZSA9PiB7XG4gIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdO1xuICBhc3QudHJhdmVyc2VCeVR5cGUoJ2RlY2xhcmF0aW9uJywgbm9kZSA9PiBkZWNsYXJhdGlvbnMucHVzaChub2RlKSk7XG5cbiAgcmV0dXJuIGZwLmNvbXBvc2UoXG4gICAgZnAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0cnVlOyAvLyBtYXJrIGNvbXBvc2VkIGNsYXNzZXMgYXMgdHJ1ZVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSksXG4gICAgZnAuZmxhdE1hcChmcC5jb21wb3NlKFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgICBmcC5maW5kKHsgdHlwZTogJ2lkZW50JyB9KSxcbiAgICAgIGZwLmdldCgnY29udGVudCcpLFxuICAgICAgZnAuZmluZCh7IHR5cGU6ICdjbGFzcycgfSksXG4gICAgICBmcC5nZXQoJ2NvbnRlbnQnKSxcbiAgICAgIGZwLmZpbmQoeyB0eXBlOiAndmFsdWUnIH0pLFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgKSksXG4gICAgLypcbiAgICAgICByZWplY3QgY2xhc3NlcyBjb21wb3NpbmcgZnJvbSBvdGhlciBmaWxlc1xuICAgICAgIGVnLlxuICAgICAgIC5mb28ge1xuICAgICAgIGNvbXBvc2VzOiAuYmFyIGZyb20gJy4vb3RoZXJGaWxlJztcbiAgICAgICB9XG4gICAgICovXG4gICAgZnAucmVqZWN0KGZwLmNvbXBvc2UoXG4gICAgICBmcC5maW5kKHsgdHlwZTogJ2lkZW50JywgY29udGVudDogJ2Zyb20nIH0pLFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgICBmcC5maW5kKHsgdHlwZTogJ3ZhbHVlJyB9KSxcbiAgICAgIGZwLmdldCgnY29udGVudCcpLFxuICAgICkpLFxuICAgIGZwLmZpbHRlcihmcC5jb21wb3NlKFxuICAgICAgZnAuZmluZCh7IHR5cGU6ICdpZGVudCcsIGNvbnRlbnQ6ICdjb21wb3NlcycgfSksXG4gICAgICBmcC5nZXQoJ2NvbnRlbnQnKSxcbiAgICAgIGZwLmZpbmQoeyB0eXBlOiAncHJvcGVydHknIH0pLFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgKSksXG4gICkoZGVjbGFyYXRpb25zKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHRlbmRDbGFzc2VzTWFwID0gKGFzdDogZ0FTVE5vZGUpOiBjbGFzc01hcFR5cGUgPT4ge1xuICBjb25zdCBleHRlbmROb2RlcyA9IFtdO1xuICBhc3QudHJhdmVyc2VCeVR5cGUoJ2V4dGVuZCcsIG5vZGUgPT4gZXh0ZW5kTm9kZXMucHVzaChub2RlKSk7XG5cbiAgcmV0dXJuIGZwLmNvbXBvc2UoXG4gICAgZnAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0cnVlOyAvLyBtYXJrIGV4dGVuZCBjbGFzc2VzIGFzIHRydWVcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pLFxuICAgIGZwLm1hcChmcC5jb21wb3NlKFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgICBmcC5maW5kKHsgdHlwZTogJ2lkZW50JyB9KSxcbiAgICAgIGZwLmdldCgnY29udGVudCcpLFxuICAgICAgZnAuZmluZCh7IHR5cGU6ICdjbGFzcycgfSksXG4gICAgICBmcC5nZXQoJ2NvbnRlbnQnKSxcbiAgICAgIGZwLmZpbmQoeyB0eXBlOiAnc2VsZWN0b3InIH0pLFxuICAgICAgZnAuZ2V0KCdjb250ZW50JyksXG4gICAgKSksXG4gICkoZXh0ZW5kTm9kZXMpO1xufTtcbiJdfQ==