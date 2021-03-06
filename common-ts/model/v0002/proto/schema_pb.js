// source: schema.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto_v0002.Area', null, global);
goog.exportSymbol('proto_v0002.Root', null, global);
goog.exportSymbol('proto_v0002.Section', null, global);
goog.exportSymbol('proto_v0002.SectionPageAreas', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto_v0002.Root = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto_v0002.Root.repeatedFields_, null);
};
goog.inherits(proto_v0002.Root, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto_v0002.Root.displayName = 'proto_v0002.Root';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto_v0002.Section = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto_v0002.Section.repeatedFields_, null);
};
goog.inherits(proto_v0002.Section, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto_v0002.Section.displayName = 'proto_v0002.Section';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto_v0002.SectionPageAreas = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto_v0002.SectionPageAreas.repeatedFields_, null);
};
goog.inherits(proto_v0002.SectionPageAreas, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto_v0002.SectionPageAreas.displayName = 'proto_v0002.SectionPageAreas';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto_v0002.Area = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto_v0002.Area, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto_v0002.Area.displayName = 'proto_v0002.Area';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto_v0002.Root.repeatedFields_ = [2,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto_v0002.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto_v0002.Root.prototype.toObject = function(opt_includeInstance) {
  return proto_v0002.Root.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto_v0002.Root} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Root.toObject = function(includeInstance, msg) {
  var f, obj = {
    videourl: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    pageurlsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
    version: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
    updatedattimestamp: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f,
    changecounter: (f = jspb.Message.getField(msg, 5)) == null ? undefined : f,
    sectionsList: jspb.Message.toObjectList(msg.getSectionsList(),
    proto_v0002.Section.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto_v0002.Root}
 */
proto_v0002.Root.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto_v0002.Root;
  return proto_v0002.Root.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto_v0002.Root} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto_v0002.Root}
 */
proto_v0002.Root.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVideourl(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addPageurls(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUpdatedattimestamp(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setChangecounter(value);
      break;
    case 6:
      var value = new proto_v0002.Section;
      reader.readMessage(value,proto_v0002.Section.deserializeBinaryFromReader);
      msg.addSections(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto_v0002.Root.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto_v0002.Root.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto_v0002.Root} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Root.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageurlsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getSectionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto_v0002.Section.serializeBinaryToWriter
    );
  }
};


/**
 * required string videoUrl = 1;
 * @return {string}
 */
proto_v0002.Root.prototype.getVideourl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.setVideourl = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearVideourl = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Root.prototype.hasVideourl = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated string pageUrls = 2;
 * @return {!Array<string>}
 */
proto_v0002.Root.prototype.getPageurlsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.setPageurlsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.addPageurls = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearPageurlsList = function() {
  return this.setPageurlsList([]);
};


/**
 * required int32 version = 3;
 * @return {number}
 */
proto_v0002.Root.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.setVersion = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearVersion = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Root.prototype.hasVersion = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * required int64 updatedAtTimestamp = 4;
 * @return {number}
 */
proto_v0002.Root.prototype.getUpdatedattimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.setUpdatedattimestamp = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearUpdatedattimestamp = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Root.prototype.hasUpdatedattimestamp = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * required int32 changeCounter = 5;
 * @return {number}
 */
proto_v0002.Root.prototype.getChangecounter = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.setChangecounter = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearChangecounter = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Root.prototype.hasChangecounter = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated Section sections = 6;
 * @return {!Array<!proto_v0002.Section>}
 */
proto_v0002.Root.prototype.getSectionsList = function() {
  return /** @type{!Array<!proto_v0002.Section>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto_v0002.Section, 6));
};


/**
 * @param {!Array<!proto_v0002.Section>} value
 * @return {!proto_v0002.Root} returns this
*/
proto_v0002.Root.prototype.setSectionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto_v0002.Section=} opt_value
 * @param {number=} opt_index
 * @return {!proto_v0002.Section}
 */
proto_v0002.Root.prototype.addSections = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto_v0002.Section, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto_v0002.Root} returns this
 */
proto_v0002.Root.prototype.clearSectionsList = function() {
  return this.setSectionsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto_v0002.Section.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto_v0002.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto_v0002.Section.prototype.toObject = function(opt_includeInstance) {
  return proto_v0002.Section.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto_v0002.Section} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Section.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageidxsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    pageareasList: jspb.Message.toObjectList(msg.getPageareasList(),
    proto_v0002.SectionPageAreas.toObject, includeInstance),
    startsecsmultiply10: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
    endsecsmultiply10: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto_v0002.Section}
 */
proto_v0002.Section.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto_v0002.Section;
  return proto_v0002.Section.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto_v0002.Section} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto_v0002.Section}
 */
proto_v0002.Section.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt32() : [reader.readInt32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addPageidxs(values[i]);
      }
      break;
    case 2:
      var value = new proto_v0002.SectionPageAreas;
      reader.readMessage(value,proto_v0002.SectionPageAreas.deserializeBinaryFromReader);
      msg.addPageareas(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartsecsmultiply10(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEndsecsmultiply10(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto_v0002.Section.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto_v0002.Section.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto_v0002.Section} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Section.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPageidxsList();
  if (f.length > 0) {
    writer.writeRepeatedInt32(
      1,
      f
    );
  }
  f = message.getPageareasList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto_v0002.SectionPageAreas.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * repeated int32 pageIdxs = 1;
 * @return {!Array<number>}
 */
proto_v0002.Section.prototype.getPageidxsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.setPageidxsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.addPageidxs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.clearPageidxsList = function() {
  return this.setPageidxsList([]);
};


/**
 * repeated SectionPageAreas pageAreas = 2;
 * @return {!Array<!proto_v0002.SectionPageAreas>}
 */
proto_v0002.Section.prototype.getPageareasList = function() {
  return /** @type{!Array<!proto_v0002.SectionPageAreas>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto_v0002.SectionPageAreas, 2));
};


/**
 * @param {!Array<!proto_v0002.SectionPageAreas>} value
 * @return {!proto_v0002.Section} returns this
*/
proto_v0002.Section.prototype.setPageareasList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto_v0002.SectionPageAreas=} opt_value
 * @param {number=} opt_index
 * @return {!proto_v0002.SectionPageAreas}
 */
proto_v0002.Section.prototype.addPageareas = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto_v0002.SectionPageAreas, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.clearPageareasList = function() {
  return this.setPageareasList([]);
};


/**
 * required int32 startSecsMultiply10 = 3;
 * @return {number}
 */
proto_v0002.Section.prototype.getStartsecsmultiply10 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.setStartsecsmultiply10 = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.clearStartsecsmultiply10 = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Section.prototype.hasStartsecsmultiply10 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * required int32 endSecsMultiply10 = 4;
 * @return {number}
 */
proto_v0002.Section.prototype.getEndsecsmultiply10 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.setEndsecsmultiply10 = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Section} returns this
 */
proto_v0002.Section.prototype.clearEndsecsmultiply10 = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Section.prototype.hasEndsecsmultiply10 = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto_v0002.SectionPageAreas.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto_v0002.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto_v0002.SectionPageAreas.prototype.toObject = function(opt_includeInstance) {
  return proto_v0002.SectionPageAreas.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto_v0002.SectionPageAreas} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.SectionPageAreas.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageidx: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    areasList: jspb.Message.toObjectList(msg.getAreasList(),
    proto_v0002.Area.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto_v0002.SectionPageAreas}
 */
proto_v0002.SectionPageAreas.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto_v0002.SectionPageAreas;
  return proto_v0002.SectionPageAreas.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto_v0002.SectionPageAreas} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto_v0002.SectionPageAreas}
 */
proto_v0002.SectionPageAreas.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPageidx(value);
      break;
    case 2:
      var value = new proto_v0002.Area;
      reader.readMessage(value,proto_v0002.Area.deserializeBinaryFromReader);
      msg.addAreas(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto_v0002.SectionPageAreas.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto_v0002.SectionPageAreas.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto_v0002.SectionPageAreas} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.SectionPageAreas.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAreasList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto_v0002.Area.serializeBinaryToWriter
    );
  }
};


/**
 * required int32 pageIdx = 1;
 * @return {number}
 */
proto_v0002.SectionPageAreas.prototype.getPageidx = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.SectionPageAreas} returns this
 */
proto_v0002.SectionPageAreas.prototype.setPageidx = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.SectionPageAreas} returns this
 */
proto_v0002.SectionPageAreas.prototype.clearPageidx = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.SectionPageAreas.prototype.hasPageidx = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated Area areas = 2;
 * @return {!Array<!proto_v0002.Area>}
 */
proto_v0002.SectionPageAreas.prototype.getAreasList = function() {
  return /** @type{!Array<!proto_v0002.Area>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto_v0002.Area, 2));
};


/**
 * @param {!Array<!proto_v0002.Area>} value
 * @return {!proto_v0002.SectionPageAreas} returns this
*/
proto_v0002.SectionPageAreas.prototype.setAreasList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto_v0002.Area=} opt_value
 * @param {number=} opt_index
 * @return {!proto_v0002.Area}
 */
proto_v0002.SectionPageAreas.prototype.addAreas = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto_v0002.Area, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto_v0002.SectionPageAreas} returns this
 */
proto_v0002.SectionPageAreas.prototype.clearAreasList = function() {
  return this.setAreasList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto_v0002.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto_v0002.Area.prototype.toObject = function(opt_includeInstance) {
  return proto_v0002.Area.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto_v0002.Area} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Area.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    y: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
    width: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
    height: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto_v0002.Area}
 */
proto_v0002.Area.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto_v0002.Area;
  return proto_v0002.Area.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto_v0002.Area} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto_v0002.Area}
 */
proto_v0002.Area.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setY(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setWidth(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto_v0002.Area.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto_v0002.Area.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto_v0002.Area} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto_v0002.Area.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeSint32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeSint32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeSint32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeSint32(
      4,
      f
    );
  }
};


/**
 * required sint32 x = 1;
 * @return {number}
 */
proto_v0002.Area.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.setX = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.clearX = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Area.prototype.hasX = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required sint32 y = 2;
 * @return {number}
 */
proto_v0002.Area.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.setY = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.clearY = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Area.prototype.hasY = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required sint32 width = 3;
 * @return {number}
 */
proto_v0002.Area.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.setWidth = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.clearWidth = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Area.prototype.hasWidth = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * required sint32 height = 4;
 * @return {number}
 */
proto_v0002.Area.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.setHeight = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto_v0002.Area} returns this
 */
proto_v0002.Area.prototype.clearHeight = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto_v0002.Area.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 4) != null;
};


goog.object.extend(exports, proto_v0002);
