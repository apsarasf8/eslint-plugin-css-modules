'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  meta: {
    docs: {
      description: 'Checks that you are using the existent css/scss/less classes, no more no less',
      recommended: true
    }
  },
  create: function create(context) {
    var dirName = _path2.default.dirname(context.getFilename());

    /*
       maps variable name to property Object
       map = { [variableName]: { classes: { foo: true }, node: {...} }
        example:
       import s from './foo.scss';
       s is variable name
        property Object has two keys
       1. classes: an object with className as key and a boolean as value.
       The boolean is marked if it is used in file
       2. node: node that correspond to s (see example above)
     */
    var map = {};

    return {
      ImportDeclaration: function ImportDeclaration(node) {
        var styleImportNodeData = (0, _core.getStyleImportNodeData)(node);

        if (!styleImportNodeData) {
          return;
        }

        var importName = styleImportNodeData.importName,
            styleFilePath = styleImportNodeData.styleFilePath,
            importNode = styleImportNodeData.importNode;


        var styleFileAbsolutePath = _path2.default.resolve(dirName, styleFilePath);

        /*
           maps classNames with a boolean to mark as used in source
         */
        var classNamesMap = (0, _core.getStyleClasses)(styleFileAbsolutePath);

        // this will be used to mark s.foo as used in MemberExpression
        _lodash2.default.set(map, importName + '.classes', classNamesMap);

        // save node for reporting unused styles
        _lodash2.default.set(map, importName + '.node', importNode);
      },

      MemberExpression: function MemberExpression(node) {
        /*
           Check if property exists in css/scss file as class
         */

        var objectName = node.object.name;

        var propertyName = (0, _core.getPropertyName)(node);

        if (!propertyName || _lodash2.default.startsWith(propertyName, '_')) {
          /*
             skip property names starting with _
             eg. special functions provided
             by css modules like _getCss()
              Tried to just skip function calls, but the parser
             thinks of normal property access like s._getCss and
             function calls like s._getCss() as same.
           */
          return;
        }

        var availableClasses = _lodash2.default.get(map, objectName + '.classes');

        if (availableClasses && availableClasses.hasOwnProperty(propertyName)) {
          // mark as used
          availableClasses[propertyName] = true;
        }
      },
      'Program:exit': function ProgramExit() {
        /*
           Check if all classes defined in css/scss file are used
         */

        /*
           if option is passed to mark a class as used, example:
           eslint css-modules/no-unused-class: [2, { markAsUsed: ['container'] }]
           note: options[0] is actually the element at index 1 in above line
         */
        var markAsUsed = _lodash2.default.get(context, 'options[0].markAsUsed');

        /*
           we are looping over each import style node in program
           example:
           ```
             import s from './foo.css';
             import x from './bar.scss';
           ```
           then the loop will be run 2 times
         */
        _lodash2.default.forOwn(map, function (o) {
          var classes = o.classes,
              node = o.node;


          _lodash2.default.forEach(markAsUsed, function (usedClass) {
            classes[usedClass] = true;
          });

          // classNames not marked as true are unused
          var unusedClasses = Object.keys(_lodash2.default.omitBy(classes, null));

          if (!_lodash2.default.isEmpty(unusedClasses)) {
            context.report(node, 'Unused classes found: ' + unusedClasses.join(', '));
          }
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9ydWxlcy9uby11bnVzZWQtY2xhc3MuanMiXSwibmFtZXMiOlsibWV0YSIsImRvY3MiLCJkZXNjcmlwdGlvbiIsInJlY29tbWVuZGVkIiwiY3JlYXRlIiwiY29udGV4dCIsImRpck5hbWUiLCJkaXJuYW1lIiwiZ2V0RmlsZW5hbWUiLCJtYXAiLCJJbXBvcnREZWNsYXJhdGlvbiIsIm5vZGUiLCJzdHlsZUltcG9ydE5vZGVEYXRhIiwiaW1wb3J0TmFtZSIsInN0eWxlRmlsZVBhdGgiLCJpbXBvcnROb2RlIiwic3R5bGVGaWxlQWJzb2x1dGVQYXRoIiwicmVzb2x2ZSIsImNsYXNzTmFtZXNNYXAiLCJzZXQiLCJNZW1iZXJFeHByZXNzaW9uIiwib2JqZWN0TmFtZSIsIm9iamVjdCIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJzdGFydHNXaXRoIiwiYXZhaWxhYmxlQ2xhc3NlcyIsImdldCIsImhhc093blByb3BlcnR5IiwibWFya0FzVXNlZCIsImZvck93biIsIm8iLCJjbGFzc2VzIiwiZm9yRWFjaCIsInVzZWRDbGFzcyIsInVudXNlZENsYXNzZXMiLCJPYmplY3QiLCJrZXlzIiwib21pdEJ5IiwiaXNFbXB0eSIsInJlcG9ydCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztrQkFRZTtBQUNiQSxRQUFNO0FBQ0pDLFVBQU07QUFDSkMsbUJBQWEsK0VBRFQ7QUFFSkMsbUJBQWE7QUFGVDtBQURGLEdBRE87QUFPYkMsUUFQYSxrQkFPTEMsT0FQSyxFQU9ZO0FBQ3ZCLFFBQU1DLFVBQVUsZUFBS0MsT0FBTCxDQUFhRixRQUFRRyxXQUFSLEVBQWIsQ0FBaEI7O0FBRUE7Ozs7Ozs7Ozs7O0FBYUEsUUFBTUMsTUFBTSxFQUFaOztBQUVBLFdBQU87QUFDTEMsdUJBREssNkJBQ2NDLElBRGQsRUFDNEI7QUFDL0IsWUFBTUMsc0JBQXNCLGtDQUF1QkQsSUFBdkIsQ0FBNUI7O0FBRUEsWUFBSSxDQUFDQyxtQkFBTCxFQUEwQjtBQUN4QjtBQUNEOztBQUw4QixZQVE3QkMsVUFSNkIsR0FXM0JELG1CQVgyQixDQVE3QkMsVUFSNkI7QUFBQSxZQVM3QkMsYUFUNkIsR0FXM0JGLG1CQVgyQixDQVM3QkUsYUFUNkI7QUFBQSxZQVU3QkMsVUFWNkIsR0FXM0JILG1CQVgyQixDQVU3QkcsVUFWNkI7OztBQWEvQixZQUFNQyx3QkFBd0IsZUFBS0MsT0FBTCxDQUFhWCxPQUFiLEVBQXNCUSxhQUF0QixDQUE5Qjs7QUFFQTs7O0FBR0EsWUFBTUksZ0JBQWdCLDJCQUFnQkYscUJBQWhCLENBQXRCOztBQUVBO0FBQ0EseUJBQUVHLEdBQUYsQ0FBTVYsR0FBTixFQUFjSSxVQUFkLGVBQW9DSyxhQUFwQzs7QUFFQTtBQUNBLHlCQUFFQyxHQUFGLENBQU1WLEdBQU4sRUFBY0ksVUFBZCxZQUFpQ0UsVUFBakM7QUFDRCxPQTFCSTs7QUEyQkxLLHdCQUFrQiwwQkFBQ1QsSUFBRCxFQUFrQjtBQUNsQzs7OztBQUlBLFlBQU1VLGFBQWFWLEtBQUtXLE1BQUwsQ0FBWUMsSUFBL0I7O0FBRUEsWUFBTUMsZUFBZSwyQkFBZ0JiLElBQWhCLENBQXJCOztBQUVBLFlBQUksQ0FBQ2EsWUFBRCxJQUFpQixpQkFBRUMsVUFBRixDQUFhRCxZQUFiLEVBQTJCLEdBQTNCLENBQXJCLEVBQXNEO0FBQ3BEOzs7Ozs7OztBQVNBO0FBQ0Q7O0FBRUQsWUFBTUUsbUJBQW1CLGlCQUFFQyxHQUFGLENBQU1sQixHQUFOLEVBQWNZLFVBQWQsY0FBekI7O0FBRUEsWUFBSUssb0JBQW9CQSxpQkFBaUJFLGNBQWpCLENBQWdDSixZQUFoQyxDQUF4QixFQUF1RTtBQUNyRTtBQUNBRSwyQkFBaUJGLFlBQWpCLElBQWlDLElBQWpDO0FBQ0Q7QUFDRixPQXZESTtBQXdETCxvQkF4REsseUJBd0RhO0FBQ2hCOzs7O0FBSUE7Ozs7O0FBS0EsWUFBTUssYUFBYSxpQkFBRUYsR0FBRixDQUFNdEIsT0FBTixFQUFlLHVCQUFmLENBQW5COztBQUVBOzs7Ozs7Ozs7QUFTQSx5QkFBRXlCLE1BQUYsQ0FBU3JCLEdBQVQsRUFBYyxVQUFDc0IsQ0FBRCxFQUFPO0FBQUEsY0FDWEMsT0FEVyxHQUNPRCxDQURQLENBQ1hDLE9BRFc7QUFBQSxjQUNGckIsSUFERSxHQUNPb0IsQ0FEUCxDQUNGcEIsSUFERTs7O0FBR25CLDJCQUFFc0IsT0FBRixDQUFVSixVQUFWLEVBQXNCLHFCQUFhO0FBQ2pDRyxvQkFBUUUsU0FBUixJQUFxQixJQUFyQjtBQUNELFdBRkQ7O0FBSUE7QUFDQSxjQUFNQyxnQkFBZ0JDLE9BQU9DLElBQVAsQ0FBWSxpQkFBRUMsTUFBRixDQUFTTixPQUFULEVBQWtCLElBQWxCLENBQVosQ0FBdEI7O0FBRUEsY0FBSSxDQUFDLGlCQUFFTyxPQUFGLENBQVVKLGFBQVYsQ0FBTCxFQUErQjtBQUM3QjlCLG9CQUFRbUMsTUFBUixDQUFlN0IsSUFBZiw2QkFBOEN3QixjQUFjTSxJQUFkLENBQW1CLElBQW5CLENBQTlDO0FBQ0Q7QUFDRixTQWJEO0FBY0Q7QUEzRkksS0FBUDtBQTZGRDtBQXRIWSxDIiwiZmlsZSI6Im5vLXVudXNlZC1jbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7XG4gIGdldFN0eWxlSW1wb3J0Tm9kZURhdGEsXG4gIGdldFN0eWxlQ2xhc3NlcyxcbiAgZ2V0UHJvcGVydHlOYW1lLFxufSBmcm9tICcuLi9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBKc05vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hlY2tzIHRoYXQgeW91IGFyZSB1c2luZyB0aGUgZXhpc3RlbnQgY3NzL3Njc3MvbGVzcyBjbGFzc2VzLCBubyBtb3JlIG5vIGxlc3MnLFxuICAgICAgcmVjb21tZW5kZWQ6IHRydWUsXG4gICAgfVxuICB9LFxuICBjcmVhdGUgKGNvbnRleHQ6IE9iamVjdCkge1xuICAgIGNvbnN0IGRpck5hbWUgPSBwYXRoLmRpcm5hbWUoY29udGV4dC5nZXRGaWxlbmFtZSgpKTtcblxuICAgIC8qXG4gICAgICAgbWFwcyB2YXJpYWJsZSBuYW1lIHRvIHByb3BlcnR5IE9iamVjdFxuICAgICAgIG1hcCA9IHsgW3ZhcmlhYmxlTmFtZV06IHsgY2xhc3NlczogeyBmb286IHRydWUgfSwgbm9kZTogey4uLn0gfVxuXG4gICAgICAgZXhhbXBsZTpcbiAgICAgICBpbXBvcnQgcyBmcm9tICcuL2Zvby5zY3NzJztcbiAgICAgICBzIGlzIHZhcmlhYmxlIG5hbWVcblxuICAgICAgIHByb3BlcnR5IE9iamVjdCBoYXMgdHdvIGtleXNcbiAgICAgICAxLiBjbGFzc2VzOiBhbiBvYmplY3Qgd2l0aCBjbGFzc05hbWUgYXMga2V5IGFuZCBhIGJvb2xlYW4gYXMgdmFsdWUuXG4gICAgICAgVGhlIGJvb2xlYW4gaXMgbWFya2VkIGlmIGl0IGlzIHVzZWQgaW4gZmlsZVxuICAgICAgIDIuIG5vZGU6IG5vZGUgdGhhdCBjb3JyZXNwb25kIHRvIHMgKHNlZSBleGFtcGxlIGFib3ZlKVxuICAgICAqL1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIEltcG9ydERlY2xhcmF0aW9uIChub2RlOiBKc05vZGUpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVJbXBvcnROb2RlRGF0YSA9IGdldFN0eWxlSW1wb3J0Tm9kZURhdGEobm9kZSk7XG5cbiAgICAgICAgaWYgKCFzdHlsZUltcG9ydE5vZGVEYXRhKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGltcG9ydE5hbWUsXG4gICAgICAgICAgc3R5bGVGaWxlUGF0aCxcbiAgICAgICAgICBpbXBvcnROb2RlLFxuICAgICAgICB9ID0gc3R5bGVJbXBvcnROb2RlRGF0YTtcblxuICAgICAgICBjb25zdCBzdHlsZUZpbGVBYnNvbHV0ZVBhdGggPSBwYXRoLnJlc29sdmUoZGlyTmFtZSwgc3R5bGVGaWxlUGF0aCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgbWFwcyBjbGFzc05hbWVzIHdpdGggYSBib29sZWFuIHRvIG1hcmsgYXMgdXNlZCBpbiBzb3VyY2VcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXNNYXAgPSBnZXRTdHlsZUNsYXNzZXMoc3R5bGVGaWxlQWJzb2x1dGVQYXRoKTtcblxuICAgICAgICAvLyB0aGlzIHdpbGwgYmUgdXNlZCB0byBtYXJrIHMuZm9vIGFzIHVzZWQgaW4gTWVtYmVyRXhwcmVzc2lvblxuICAgICAgICBfLnNldChtYXAsIGAke2ltcG9ydE5hbWV9LmNsYXNzZXNgLCBjbGFzc05hbWVzTWFwKTtcblxuICAgICAgICAvLyBzYXZlIG5vZGUgZm9yIHJlcG9ydGluZyB1bnVzZWQgc3R5bGVzXG4gICAgICAgIF8uc2V0KG1hcCwgYCR7aW1wb3J0TmFtZX0ubm9kZWAsIGltcG9ydE5vZGUpO1xuICAgICAgfSxcbiAgICAgIE1lbWJlckV4cHJlc3Npb246IChub2RlOiBKc05vZGUpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgQ2hlY2sgaWYgcHJvcGVydHkgZXhpc3RzIGluIGNzcy9zY3NzIGZpbGUgYXMgY2xhc3NcbiAgICAgICAgICovXG5cbiAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IG5vZGUub2JqZWN0Lm5hbWU7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gZ2V0UHJvcGVydHlOYW1lKG5vZGUpO1xuXG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lIHx8IF8uc3RhcnRzV2l0aChwcm9wZXJ0eU5hbWUsICdfJykpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgIHNraXAgcHJvcGVydHkgbmFtZXMgc3RhcnRpbmcgd2l0aCBfXG4gICAgICAgICAgICAgZWcuIHNwZWNpYWwgZnVuY3Rpb25zIHByb3ZpZGVkXG4gICAgICAgICAgICAgYnkgY3NzIG1vZHVsZXMgbGlrZSBfZ2V0Q3NzKClcblxuICAgICAgICAgICAgIFRyaWVkIHRvIGp1c3Qgc2tpcCBmdW5jdGlvbiBjYWxscywgYnV0IHRoZSBwYXJzZXJcbiAgICAgICAgICAgICB0aGlua3Mgb2Ygbm9ybWFsIHByb3BlcnR5IGFjY2VzcyBsaWtlIHMuX2dldENzcyBhbmRcbiAgICAgICAgICAgICBmdW5jdGlvbiBjYWxscyBsaWtlIHMuX2dldENzcygpIGFzIHNhbWUuXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXZhaWxhYmxlQ2xhc3NlcyA9IF8uZ2V0KG1hcCwgYCR7b2JqZWN0TmFtZX0uY2xhc3Nlc2ApO1xuXG4gICAgICAgIGlmIChhdmFpbGFibGVDbGFzc2VzICYmIGF2YWlsYWJsZUNsYXNzZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgIC8vIG1hcmsgYXMgdXNlZFxuICAgICAgICAgIGF2YWlsYWJsZUNsYXNzZXNbcHJvcGVydHlOYW1lXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnUHJvZ3JhbTpleGl0JyAoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgIENoZWNrIGlmIGFsbCBjbGFzc2VzIGRlZmluZWQgaW4gY3NzL3Njc3MgZmlsZSBhcmUgdXNlZFxuICAgICAgICAgKi9cblxuICAgICAgICAvKlxuICAgICAgICAgICBpZiBvcHRpb24gaXMgcGFzc2VkIHRvIG1hcmsgYSBjbGFzcyBhcyB1c2VkLCBleGFtcGxlOlxuICAgICAgICAgICBlc2xpbnQgY3NzLW1vZHVsZXMvbm8tdW51c2VkLWNsYXNzOiBbMiwgeyBtYXJrQXNVc2VkOiBbJ2NvbnRhaW5lciddIH1dXG4gICAgICAgICAgIG5vdGU6IG9wdGlvbnNbMF0gaXMgYWN0dWFsbHkgdGhlIGVsZW1lbnQgYXQgaW5kZXggMSBpbiBhYm92ZSBsaW5lXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBtYXJrQXNVc2VkID0gXy5nZXQoY29udGV4dCwgJ29wdGlvbnNbMF0ubWFya0FzVXNlZCcpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgIHdlIGFyZSBsb29waW5nIG92ZXIgZWFjaCBpbXBvcnQgc3R5bGUgbm9kZSBpbiBwcm9ncmFtXG4gICAgICAgICAgIGV4YW1wbGU6XG4gICAgICAgICAgIGBgYFxuICAgICAgICAgICAgIGltcG9ydCBzIGZyb20gJy4vZm9vLmNzcyc7XG4gICAgICAgICAgICAgaW1wb3J0IHggZnJvbSAnLi9iYXIuc2Nzcyc7XG4gICAgICAgICAgIGBgYFxuICAgICAgICAgICB0aGVuIHRoZSBsb29wIHdpbGwgYmUgcnVuIDIgdGltZXNcbiAgICAgICAgICovXG4gICAgICAgIF8uZm9yT3duKG1hcCwgKG8pID0+IHtcbiAgICAgICAgICBjb25zdCB7IGNsYXNzZXMsIG5vZGUgfSA9IG87XG5cbiAgICAgICAgICBfLmZvckVhY2gobWFya0FzVXNlZCwgdXNlZENsYXNzID0+IHtcbiAgICAgICAgICAgIGNsYXNzZXNbdXNlZENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBjbGFzc05hbWVzIG5vdCBtYXJrZWQgYXMgdHJ1ZSBhcmUgdW51c2VkXG4gICAgICAgICAgY29uc3QgdW51c2VkQ2xhc3NlcyA9IE9iamVjdC5rZXlzKF8ub21pdEJ5KGNsYXNzZXMsIG51bGwpKTtcblxuICAgICAgICAgIGlmICghXy5pc0VtcHR5KHVudXNlZENsYXNzZXMpKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBgVW51c2VkIGNsYXNzZXMgZm91bmQ6ICR7dW51c2VkQ2xhc3Nlcy5qb2luKCcsICcpfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcbiJdfQ==